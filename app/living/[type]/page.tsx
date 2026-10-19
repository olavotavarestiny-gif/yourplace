import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { living } from "@/lib/content";
import { Button, Label, Photo } from "@/components/primitives";
import { Closing } from "@/components/footer";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ type: "shared" }, { type: "serviced" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  return { title: living[type as keyof typeof living]?.name || "Our Living" };
}
export default async function Living({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const item = living[type as keyof typeof living];
  if (!item) notFound();
  return (
    <main id="main" className="living-page">
      <section className="living-page-intro content-width">
        <div>
          <Label>
            {type === "shared" ? "A home to share" : "A familiar feeling"}
          </Label>
          <h1>{item.name}.</h1>
          <p>{item.description}</p>
          <Button href={`/contact?stay=${type}`}>Let’s find your place</Button>
        </div>
        <div className="living-page-photo">
          <Photo
            name={item.image}
            alt={`An original Your Best Place ${type === "shared" ? "shared kitchen" : "bedroom"}`}
            priority
          />
          <Photo
            name={type === "shared" ? "living-detail" : "quiet-corner"}
            alt="A considered interior detail at Your Best Place"
            className="living-detail-inset"
          />
        </div>
      </section>
      <section className="living-detail-copy content-width">
        <div>
          <Label>Made for everyday life</Label>
          <h2>{item.headline}</h2>
          <p>{item.body}</p>
        </div>
        <div>
          <h3>A little more space to be yourself.</h3>
          <ul className="detail-points">
            {item.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="fine-print">
            Every home is different. Ask our team about the specific features,
            services and terms of the accommodation you’re considering.
          </p>
          <Button
            href={`/living/${type === "shared" ? "serviced" : "shared"}`}
            variant="secondary"
          >
            Discover {type === "shared" ? "Serviced Stays" : "Shared Living"}
          </Button>
        </div>
      </section>
      <Closing />
    </main>
  );
}
