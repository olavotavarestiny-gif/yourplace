# Your Best Place

Hospitality website built with Next.js App Router, TypeScript and Tailwind CSS. Includes destination discovery, shared living and serviced accommodation pages, and a validated enquiry form.

## Development

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Production

```sh
npm run build
npm start
```

## Deploy to Vercel

Import `olavotavarestiny-gif/yourplace` into Vercel and select the `main` branch.

- **Framework:** Next.js
- **Root directory:** repository root
- **Build command:** `npm run build`
- **Output directory:** leave the framework default
- **Environment variables:** none required

Deployment URLs are detected automatically for social metadata. Optionally set `NEXT_PUBLIC_SITE_URL` to the final custom domain, including `https://`. See `.env.example`.

Search indexing remains disabled until the final domain is approved.

## Enquiries

The finder preserves destination, stay type and arrival preferences. The contact form validates the details and prepares an email for the visitor to review and send. It does not store enquiries, send messages automatically or confirm reservations.

## Content and assets

Company information and the guest quotation are based on the original Your Best Place website. Photography sources are recorded in `public/images/sources.json`. Confirm image usage rights with the company before a public launch. No property prices or availability are asserted.

Bodoni Moda and DM Sans are hosted locally under the SIL Open Font License. Licence files are included in `public/fonts/`. Responsive WebP images are served through a custom loader.

## Checks

```sh
npm run typecheck
npm run build
npm start
npm run test:e2e
```

Browser checks cover all 15 pages at five widths from 320 to 1440px, destination filters, enquiry validation, email drafts, mobile navigation, keyboard focus, contrast and reduced motion. Tests use installed Google Chrome on macOS. Elsewhere, install Chromium with `npx playwright install chromium` or set `CHROME_PATH`. Use `TEST_URL` for a different local port.
