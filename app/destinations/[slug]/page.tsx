import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { destinations } from "@/lib/content";
import { Button, Label, Photo } from "@/components/primitives";
export const dynamicParams = false;
export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Stay in ${destinations.find((d) => d.slug === slug)?.name || "our destinations"}`,
  };
}
export default async function Destination({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = destinations.find((d) => d.slug === slug);
  if (!place) notFound();
  return (
    <main id="main">
      <section className="destination-hero">
        <Photo
          name={place.slug}
          alt={`A view of ${place.name}`}
          priority
          sizes="100vw"
        />
        <div>
          <Label>{place.country}</Label>
          <h1>
            At home in
            <br />
            {place.name}.
          </h1>
        </div>
      </section>
      <section className="destination-intro content-width">
        <div>
          <Label>A sense of place</Label>
          <h2>
            Find your own
            <br />
            corner of {place.name}.
          </h2>
          <p>{place.description}</p>
          <Button href={`/contact?destination=${place.slug}`}>
            Enquire about {place.name}
          </Button>
        </div>
        <div className="destination-information">
          <p>
            A new neighbourhood. A different daily routine. A place to return to
            at the end of the day. Tell us what brings you to {place.name}, and
            we’ll help you explore what’s possible.
          </p>
          <p>
            Our team can advise on accommodation options, dates and the details
            that matter to you.
          </p>
          <p className="fine-print">
            This destination is listed on the original Your Best Place website.
            Property details, prices and availability are confirmed directly by
            the team. Destination photography does not represent a particular
            property.
          </p>
        </div>
      </section>
      <section className="destination-neighbours content-width">
        <Label>A little further afield</Label>
        <h2>Keep exploring.</h2>
        <div>
          {destinations
            .filter((d) => d.country === place.country && d.slug !== slug)
            .map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="neighbour-card"
              >
                <Photo
                  name={d.slug}
                  alt={`Explore ${d.name}`}
                  sizes="(max-width: 600px) 80vw, 25vw"
                />
                <span>{d.name}</span>
              </Link>
            ))}
        </div>
        <Button href="/places" variant="secondary">
          All destinations
        </Button>
      </section>
    </main>
  );
}
