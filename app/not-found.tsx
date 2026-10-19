import { Button, Label } from "@/components/primitives";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <Label>A small detour · 404</Label>
      <h1 style={{ marginTop: 25 }}>
        Let’s find
        <br />
        your way home.
      </h1>
      <p>
        The page you’re looking for isn’t here. There are plenty of places still
        to explore.
      </p>
      <Button href="/places">Explore our places</Button>
    </main>
  );
}
