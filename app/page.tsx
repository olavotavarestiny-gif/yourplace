import { Button, Label, Photo } from "@/components/primitives";
import { Finder, PlaceExplorer } from "@/components/discovery";
import { Closing } from "@/components/footer";
import Reveal from "@/components/reveal";

export default function Home() {
  return (
    <main id="main">
      <Reveal />
      <section className="hero" aria-labelledby="hero-title">
        <Photo
          name="artful-living"
          alt="Art-lined walls and comfortable seating in an original Your Best Place living room"
          priority
          sizes="100vw"
        />
        <div className="hero-content">
          <p className="hero-kicker">Beautifully considered places</p>
          <h1 id="hero-title">
            A better kind
            <br />
            of stay.
          </h1>
          <p>
            Thoughtfully designed spaces to live,
            <br />
            stay and feel at home.
          </p>
          <Finder />
          <span className="hero-enquiry-note">
            Start a conversation. Availability is confirmed by our team.
          </span>
        </div>
        <div className="hero-bottom">
          <span>Shared Living & Serviced Stays</span>
          <span>United Kingdom & Portugal</span>
        </div>
      </section>
      <section id="introduction" className="introduction content-width">
        <div className="intro-left" data-reveal>
          <Label>A more personal way to stay</Label>
          <h2>
            Made for living.
            <br />
            Not just staying.
          </h2>
          <Photo
            name="living-detail"
            alt="A Your Best Place sitting room with natural light, a round mirror and thoughtful details"
            sizes="(max-width: 700px) 100vw, 45vw"
          />
        </div>
        <div className="intro-right" data-reveal>
          <Photo
            name="shared-kitchen"
            alt="A bright shared kitchen with pale cabinetry and a long table at Your Best Place"
            sizes="(max-width: 700px) 100vw, 45vw"
          />
          <p>
            There’s a difference between somewhere to sleep and somewhere you
            feel at home. It’s in the light, the art on the walls, the space to
            be yourself.
          </p>
          <p>
            We bring thoughtful design and everyday comfort together. Shared
            homes and serviced stays, with a little more personality.
          </p>
          <Button href="/our-story">Discover our story</Button>
        </div>
      </section>
      <section className="destinations-section content-width" id="destinations">
        <div className="gallery-heading" data-reveal>
          <Label>Find your place</Label>
          <h2>Where will you feel at home?</h2>
          <p>City energy or a slower pace. Explore our destinations.</p>
        </div>
        <PlaceExplorer compact />
      </section>
      <section className="living-section content-width" id="our-living">
        <div className="living-copy" data-reveal>
          <Label>Stay a little. Stay a while.</Label>
          <h2>
            A place for
            <br />
            every chapter.
          </h2>
          <p>
            Your own space, with good company close by. Or a comfortable base
            for work, weekends and a change of scene.
          </p>
          <p>
            Two ways to stay. The same thoughtful approach to making you feel at
            home.
          </p>
          <div className="living-actions">
            <div>
              <h3>Shared Living</h3>
              <p>A room of your own. A home to share.</p>
              <Button href="/living/shared">Explore Shared Living</Button>
            </div>
            <div>
              <h3>Serviced Stays</h3>
              <p>Your own rhythm, away from home.</p>
              <Button href="/living/serviced" variant="secondary">
                Explore Serviced Stays
              </Button>
            </div>
          </div>
        </div>
        <div className="overlapping-photos" data-reveal>
          <Photo
            name="quiet-corner"
            alt="A private, softly lit corner with an amber chair at Your Best Place"
            className="overlap-back"
          />
          <Photo
            name="bathroom"
            alt="Clean lines and considered details in an original Your Best Place bathroom"
            className="overlap-front"
          />
        </div>
      </section>
      <section className="guest-section content-width" data-reveal>
        <Photo
          name="calm-bedroom"
          alt="A calm Your Best Place bedroom in warm neutral tones"
        />
        <div className="guest-copy">
          <Label>The feeling stays with you</Label>
          <h2>
            A home,
            <br />
            away from home.
          </h2>
          <blockquote>
            <p>
              “My family stayed for a week and the place felt like home, it was
              hard to leave! I 100% recommend this place.”
            </p>
            <footer>
              <strong>Annie</strong>
              <span>Your Best Place guest</span>
            </footer>
          </blockquote>
          <a
            className="quote-source"
            href="https://www.yourbestplace.co.uk/#:~:text=My%20family%20stayed"
          >
            From our original guest stories
          </a>
        </div>
      </section>
      <Closing />
    </main>
  );
}
