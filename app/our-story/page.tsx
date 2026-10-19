import type { Metadata } from "next";
import { Label, Photo, Button } from "@/components/primitives";
import { Closing } from "@/components/footer";
export const metadata: Metadata = { title: "Our Story" };
export default function Story() {
  return (
    <main id="main" className="story-page">
      <section className="story-intro content-width">
        <div className="story-copy">
          <Label>A more personal approach</Label>
          <h1>
            Good places.
            <br />
            Better living.
          </h1>
          <p>
            We believe the place you stay should add something to your life. A
            little comfort. A sense of connection. Space to be yourself.
          </p>
          <Button href="/places">Explore our places</Button>
        </div>
        <div className="story-photos">
          <Photo
            name="artful-living"
            alt="Art and comfortable seating in an original Your Best Place living space"
            priority
          />
          <Photo
            name="quiet-corner"
            alt="A private corner at Your Best Place"
          />
        </div>
      </section>
      <section className="story-approach content-width">
        <Photo
          name="shared-kitchen"
          alt="A welcoming Your Best Place kitchen, made for everyday living"
        />
        <div>
          <Label>The thinking behind the feeling</Label>
          <h2>
            Considered spaces.
            <br />A human touch.
          </h2>
          <p>
            Your Best Place brings a design-conscious approach to shared homes
            and serviced accommodation. Art, comfort and everyday functionality
            are part of the same conversation.
          </p>
          <p>
            Whether you’re travelling or looking to stay longer, the aim is
            simple: somewhere that feels like home. Privacy when you want it. A
            sense of connection when you need it.
          </p>
          <p>
            Our destinations span the United Kingdom and Portugal. The right
            place starts with understanding what matters to you.
          </p>
          <Button href="/contact" variant="secondary">
            Tell us what home means to you
          </Button>
        </div>
      </section>
      <Closing />
    </main>
  );
}
