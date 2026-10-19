import type { Metadata } from "next";
import { PlaceExplorer } from "@/components/discovery";
import { Closing } from "@/components/footer";
import { Label } from "@/components/primitives";
export const metadata: Metadata = { title: "Explore our places" };
export default function Places() {
  return (
    <main id="main" className="explore-page">
      <div className="explore-heading content-width">
        <Label>United Kingdom & Portugal</Label>
        <h1>Find your place.</h1>
        <p>
          Somewhere familiar. Somewhere entirely new.
          <br />
          Discover a destination that feels like you.
        </p>
      </div>
      <section
        className="discovery-page content-width"
        aria-label="Explore destinations"
      >
        <PlaceExplorer />
      </section>
      <Closing />
    </main>
  );
}
