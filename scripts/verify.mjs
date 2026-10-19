import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.TEST_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : process.platform === "darwin"
      ? {
          executablePath:
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        }
      : {}),
  headless: true,
});
const errors = [];
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
page.on("pageerror", (error) => errors.push(String(error)));
page.on("response", (response) => {
  if (response.status() >= 400 && response.url().startsWith(base))
    errors.push(`${response.status()}: ${response.url()}`);
});
const widths = [1440, 1024, 768, 390, 320];
const routes = [
  "/",
  "/places/",
  "/destinations/london/",
  "/destinations/harrogate/",
  "/destinations/york/",
  "/destinations/leeds/",
  "/destinations/manchester/",
  "/destinations/liverpool/",
  "/destinations/faro/",
  "/destinations/porto/",
  "/destinations/lisbon/",
  "/living/shared/",
  "/living/serviced/",
  "/our-story/",
  "/contact/",
];
await mkdir("artifacts", { recursive: true });
async function revealAll() {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 550) {
      scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 120));
    }
    scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(750);
}
try {
  for (const route of routes) {
    const response = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    assert.equal(response.status(), 200, route);
    assert.equal(await page.locator("main h1").count(), 1, `${route}: heading`);
    assert.equal(
      await page.locator('a[href="/presentation-notes"]').count(),
      0,
    );
    for (const width of widths) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.waitForTimeout(60);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${route}: overflow at ${width}`,
      );
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await revealAll();
    assert.equal(
      await page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs.every((img) => img.complete && img.naturalWidth > 0),
        ),
      true,
      `${route}: images`,
    );
  }

  await page.goto(base, { waitUntil: "networkidle" });
  await revealAll();
  await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
  await page.screenshot({ path: "artifacts/home-first-screen.png" });
  assert.equal(await page.locator(".place-item").count(), 9);
  await page.getByRole("button", { name: "Portugal", exact: true }).click();
  assert.equal(await page.locator(".place-item").count(), 3);
  await page
    .getByRole("button", { name: "United Kingdom", exact: true })
    .click();
  assert.equal(await page.locator(".place-item").count(), 6);
  await page
    .getByRole("button", { name: "All destinations", exact: true })
    .click();
  assert.equal(await page.locator(".place-item").count(), 9);
  // The chosen reference calls for compact rounded buttons, without decorative arrows.
  const buttons = await page.locator(".button").evaluateAll((elements) =>
    elements.map((el) => ({
      height: el.getBoundingClientRect().height,
      radius: parseFloat(getComputedStyle(el).borderTopLeftRadius),
      arrows: el.querySelectorAll("svg").length,
    })),
  );
  assert.ok(
    buttons.every(
      (button) =>
        button.height >= 44 && button.radius >= 20 && button.arrows === 0,
    ),
    "Button treatment or touch targets",
  );
  assert.equal(
    await page
      .locator(".section-marker, .image-number, .destination-row, .value-list")
      .count(),
    0,
  );

  await page.goto(base + "/places/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Portugal", exact: true }).click();
  assert.equal(await page.locator(".place-item").count(), 3);
  await page.getByRole("searchbox").fill("Porto");
  assert.equal(await page.locator(".place-item").count(), 1);
  await page.getByRole("searchbox").fill("Atlantis");
  await page.getByRole("button", { name: "Clear filters" }).click();
  assert.equal(await page.locator(".place-item").count(), 9);
  await page.screenshot({
    path: "artifacts/places-desktop.png",
    fullPage: true,
  });

  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator(".finder select[name=destination]").selectOption("porto");
  await page.locator(".finder select[name=stay]").selectOption("serviced");
  await page.locator(".finder input[name=arrival]").fill("2027-01-10");
  await page.locator(".finder button").click();
  await page.waitForURL(/contact/);
  assert.equal(
    await page.locator(".enquiry-form select[name=destination]").inputValue(),
    "porto",
  );
  assert.equal(
    await page.locator(".enquiry-form select[name=stay]").inputValue(),
    "serviced",
  );
  assert.equal(
    await page.locator(".enquiry-form input[name=arrival]").inputValue(),
    "2027-01-10",
  );
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  assert.equal(await page.locator(".email-result").count(), 0);
  await page.locator("input[name=name]").fill("Alex Example");
  await page.locator("input[name=email]").fill("alex@example.com");
  await page
    .locator("textarea[name=message]")
    .fill("A quiet place for two weeks, please.");
  await page.locator("input[name=departure]").fill("2027-01-09");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await page.locator(".form-error").waitFor();
  await page.locator("input[name=departure]").fill("2027-01-24");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await page.locator(".email-result").waitFor();
  const draft = await page
    .getByRole("link", { name: "Open email draft" })
    .getAttribute("href");
  assert.ok(draft.startsWith("mailto:info@yourbestplace.co.uk?"));
  assert.ok(decodeURIComponent(draft).includes("Destination: Porto"));
  assert.ok(decodeURIComponent(draft).includes("2027-01-24"));
  assert.ok(
    await page
      .getByText("Nothing has been sent.", { exact: false })
      .isVisible(),
  );
  await page.screenshot({
    path: "artifacts/contact-desktop.png",
    fullPage: true,
  });
  const contrasts = await page.evaluate(() => {
    const luminance = (rgb) => {
      const channels = rgb
        .match(/[\d.]+/g)
        .slice(0, 3)
        .map(Number)
        .map((v) => {
          const c = v / 255;
          return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const contrast = (a, b) => {
      const x = luminance(a),
        y = luminance(b);
      return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    };
    const input = getComputedStyle(
      document.querySelector(".enquiry-form input"),
    );
    const button = getComputedStyle(
      document.querySelector(".enquiry-form .button"),
    );
    return {
      fieldBorder: contrast(input.borderColor, input.backgroundColor),
      buttonText: contrast(button.color, button.backgroundColor),
    };
  });
  assert.ok(contrasts.fieldBorder >= 3, "Input boundary contrast");
  assert.ok(contrasts.buttonText >= 4.5, "Button text contrast");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.waitForTimeout(300);
  assert.equal(
    await page
      .getByRole("button", { name: "Close navigation" })
      .getAttribute("aria-expanded"),
    "true",
  );
  await page.screenshot({ path: "artifacts/mobile-menu.png" });
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "0800 086 2456" })
    .focus();
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() =>
      document.activeElement?.getAttribute("aria-label"),
    ),
    "Close navigation",
  );
  await page.keyboard.press("Shift+Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement?.getAttribute("href")),
    "tel:+448000862456",
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Our Living" })
    .click();
  await page.waitForTimeout(350);
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.setViewportSize({ width: 1024, height: 1000 });
  await page.waitForTimeout(100);
  assert.equal(await page.evaluate(() => document.body.style.overflow), "");
  await page.setViewportSize({ width: 390, height: 844 });
  await revealAll();
  await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
  await page.screenshot({ path: "artifacts/mobile-first-screen.png" });
  await page.locator(".finder select[name=destination]").selectOption("lisbon");
  await page.locator(".finder select[name=stay]").selectOption("shared");
  await page.locator(".finder button").click();
  await page.waitForURL(/contact/);
  assert.equal(
    await page.locator(".enquiry-form select[name=destination]").inputValue(),
    "lisbon",
  );
  assert.equal(
    await page.locator(".enquiry-form select[name=stay]").inputValue(),
    "shared",
  );
  await page.screenshot({
    path: "artifacts/contact-mobile.png",
    fullPage: true,
  });
  for (const [route, name] of [
    ["/living/shared/", "living"],
    ["/our-story/", "story"],
    ["/destinations/lisbon/", "destination"],
  ]) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await revealAll();
    await page.screenshot({
      path: `artifacts/${name}-mobile.png`,
      fullPage: true,
    });
    const desktop = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    desktop.on("pageerror", (error) => errors.push(String(error)));
    await desktop.goto(base + route, { waitUntil: "networkidle" });
    await desktop.evaluate(() => document.fonts.ready);
    await desktop.waitForTimeout(300);
    await desktop.screenshot({
      path: `artifacts/${name}-desktop.png`,
      fullPage: true,
    });
    await desktop.close();
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  assert.equal(
    await page
      .locator("[data-reveal]")
      .evaluateAll((elements) =>
        elements.every((el) => getComputedStyle(el).opacity === "1"),
      ),
    true,
  );
  const removedRoute = await page.request.get(base + "/presentation-notes/");
  assert.equal(removedRoute.status(), 404, "Removed presentation route");
  assert.deepEqual(errors, []);
  const report = {
    result: "passed",
    routes: routes.length,
    widths,
    checks: [
      "all pages at all five widths",
      "no presentation footer or obsolete information page",
      "all images loaded",
      "homepage and discovery country filters",
      "destination search and empty state",
      "reference-style buttons and touch targets",
      "finder preferences preserved on desktop and mobile",
      "required fields and date ordering",
      "honest mailto enquiry",
      "mobile keyboard focus trap, Escape, anchor navigation and desktop resize",
      "reduced-motion support",
      "button text and form boundary contrast",
      "no browser runtime or resource errors",
    ],
    errors,
  };
  await writeFile(
    "artifacts/verification.json",
    JSON.stringify(report, null, 2),
  );
  console.log(
    `Passed: ${routes.length} pages at ${widths.length} widths, destination filters, enquiries, keyboard navigation, responsive imagery and reduced motion.`,
  );
} finally {
  await browser.close();
}
