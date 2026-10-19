import { Suspense } from "react";
import type { Metadata } from "next";
import { Label, Photo } from "@/components/primitives";
import EnquiryForm from "@/components/enquiry-form";
import { company } from "@/lib/content";
export const metadata: Metadata = { title: "Contact & Enquiries" };
export default function Contact() {
  return (
    <main id="main" className="contact-page">
      <section
        className="contact-layout content-width"
        aria-label="Contact and enquiry form"
      >
        <aside className="contact-aside">
          <Label>Every stay starts with a conversation</Label>
          <h1>
            Let’s find
            <br />
            your place.
          </h1>
          <p>
            A few nights or a new chapter. Tell us a little about what you’re
            looking for, and let’s take it from there.
          </p>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
          <Photo
            name="quiet-corner"
            alt="An inviting, softly lit corner at Your Best Place"
          />
          <p className="fine-print">
            Prefer a personal hello? Email or call the team to discuss
            destinations, dates and accommodation options.
          </p>
        </aside>
        <div className="contact-form-panel">
          <h2>A little about your plans.</h2>
          <p>We’d love to help you feel at home.</p>
          <Suspense fallback={<p>Loading your enquiry…</p>}>
            <EnquiryForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
