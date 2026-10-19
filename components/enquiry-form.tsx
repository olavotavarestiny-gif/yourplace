"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { company, destinations } from "@/lib/content";

export default function EnquiryForm() {
  const search = useSearchParams();
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<{ url: string; body: string } | null>(
    null,
  );
  const [copied, setCopied] = useState("");
  const arrival = search.get("arrival") || "";
  const validDestination = destinations.some(
    (d) => d.slug === search.get("destination"),
  )
    ? search.get("destination")!
    : "";
  const validStay = ["shared", "serviced"].includes(search.get("stay") || "")
    ? search.get("stay")!
    : "";
  return (
    <form
      className="enquiry-form"
      onChange={() => {
        setDraft(null);
        setError("");
        setCopied("");
      }}
      onSubmit={(e) => {
        e.preventDefault();
        setError("");
        const data = new FormData(e.currentTarget);
        const value = (key: string) => String(data.get(key) || "").trim();
        if (!value("name") || !value("email") || !value("message")) {
          setError("Please add your name, email address and a short message.");
          return;
        }
        if (
          value("departure") &&
          value("arrival") &&
          value("departure") <= value("arrival")
        ) {
          setError("Please choose a departure date after your arrival.");
          return;
        }
        if (
          value("arrival") &&
          value("arrival") < new Date().toLocaleDateString("en-CA")
        ) {
          setError("Please choose an arrival date from today onwards.");
          return;
        }
        const destination =
          destinations.find((d) => d.slug === value("destination"))?.name ||
          "To be discussed";
        const body = `Hello Your Best Place,\n\n${value("message")}\n\nFull name: ${value("name")}\nEmail: ${value("email")}\nPhone: ${value("phone") || "Not provided"}\nDestination: ${destination}\nStay type: ${value("stay") === "shared" ? "Shared Living" : value("stay") === "serviced" ? "Serviced Stays" : "To be discussed"}\nArrival: ${value("arrival") || "Flexible"}\nDeparture: ${value("departure") || "Flexible"}\n\nSent from the Your Best Place website.`;
        setDraft({
          url: `mailto:${company.email}?subject=${encodeURIComponent(`Stay enquiry — ${destination}`)}&body=${encodeURIComponent(body)}`,
          body,
        });
      }}
    >
      <label>
        Full name <span className="sr-only">required</span>
        <input
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          required
          maxLength={120}
        />
      </label>
      <label>
        Email address <span className="sr-only">required</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          maxLength={180}
        />
      </label>
      <label>
        Phone number <span className="fine-print">Optional</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Including country code"
          maxLength={40}
        />
      </label>
      <label>
        Preferred destination
        <select name="destination" defaultValue={validDestination}>
          <option value="">Let’s explore the options</option>
          {destinations.map((d) => (
            <option value={d.slug} key={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Type of stay
        <select name="stay" defaultValue={validStay}>
          <option value="">I’m open to possibilities</option>
          <option value="shared">Shared Living</option>
          <option value="serviced">Serviced Stays</option>
        </select>
      </label>
      <label>
        Preferred arrival
        <input
          name="arrival"
          type="date"
          defaultValue={/^\d{4}-\d{2}-\d{2}$/.test(arrival) ? arrival : ""}
          min={new Date().toLocaleDateString("en-CA")}
        />
      </label>
      <label>
        Preferred departure <span className="fine-print">Optional</span>
        <input
          name="departure"
          type="date"
          min={new Date().toLocaleDateString("en-CA")}
        />
      </label>
      <label className="field-wide">
        A little about your plans <span className="sr-only">required</span>
        <textarea
          name="message"
          required
          maxLength={3000}
          placeholder="Who’s coming, how long you’re staying, and what would make it feel like home…"
        />
      </label>
      <p className="fine-print">
        Your name, email and message are required. We’ll prepare an email for
        you to review and send from your own email app. No enquiry is sent or
        stored by this website. Please avoid including sensitive information.
      </p>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="button">
        Prepare my enquiry
      </button>
      {draft && (
        <div className="email-result" role="status">
          <h2>Your email draft is ready.</h2>
          <p>
            Nothing has been sent. Open your email app, review the details and
            send your enquiry to {company.email}. If an email app isn’t set up,
            copy the message into your preferred email service.
          </p>
          <a className="text-link" href={draft.url}>
            Open email draft
          </a>
          <button
            type="button"
            className="text-link"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  `To: ${company.email}\n\n${draft.body}`,
                );
                setCopied(
                  "Message copied. Paste it into your email app to send.",
                );
              } catch {
                setCopied(
                  "Copy is unavailable in this browser. Select the message below to copy it manually.",
                );
              }
            }}
          >
            Copy enquiry
          </button>
          {copied && <p className="copy-notice">{copied}</p>}
          <details style={{ marginTop: 15, fontSize: 11 }}>
            <summary>Review your message</summary>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "inherit",
                marginTop: 15,
              }}
            >
              {draft.body}
            </pre>
          </details>
        </div>
      )}
    </form>
  );
}
