import Link from "next/link";
import { Wordmark } from "./header";
import { Button, Label, Photo } from "./primitives";
import { company } from "@/lib/content";

export function Closing() {
  return (
    <section className="closing content-width">
      <div className="closing-copy">
        <Label>Make yourself at home</Label>
        <h2>
          Your next place
          <br />
          is waiting.
        </h2>
        <p>
          A few nights, a change of scene or a fresh start. Tell us what you
          have in mind.
        </p>
        <Button href="/contact">Make an enquiry</Button>
      </div>
      <Photo
        name="city-bedroom"
        alt="A light-filled Your Best Place bedroom, ready for a new chapter"
      />
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main content-width">
        <div className="footer-brand">
          <Link href="/" aria-label="Your Best Place home">
            <Wordmark />
          </Link>
          <p>
            Beautifully considered places
            <br />
            for better living.
          </p>
        </div>
        <nav className="footer-links" aria-label="Places and living">
          <span>Find your place</span>
          <Link href="/places">Explore Places</Link>
          <Link href="/living/shared">Shared Living</Link>
          <Link href="/living/serviced">Serviced Stays</Link>
        </nav>
        <nav className="footer-links" aria-label="Company information">
          <span>Get to know us</span>
          <Link href="/our-story">Our Story</Link>
          <Link href="/contact">Contact & Enquiries</Link>
          <a href={`${company.source}cmp-client-money-protection`}>
            Client Money Protection
          </a>
        </nav>
        <div className="footer-links">
          <span>Let’s talk</span>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={`tel:${company.phoneHref}`}>{company.phone}</a>
          <p>United Kingdom & Portugal</p>
        </div>
      </div>
      <div className="footer-bottom content-width">
        <span>© {new Date().getFullYear()} Your Best Place</span>
        <span>VAT 362 5347 95 · Property Ombudsman T03556</span>
        <div>
          <a href={`${company.source}privacy-policy`}>Privacy</a>
          <a href={`${company.source}terms-and-conditions`}>Terms</a>
        </div>
      </div>
    </footer>
  );
}
