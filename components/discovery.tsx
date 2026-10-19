"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { destinations } from "@/lib/content";
import { Photo } from "./primitives";

export function Finder() {
  const router = useRouter();
  return (
    <form
      className="finder"
      action="/contact"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const query = new URLSearchParams();
        for (const [key, value] of data.entries())
          if (value) query.set(key, String(value));
        router.push(`/contact?${query}`);
      }}
    >
      <label>
        <span>Destination</span>
        <select name="destination" defaultValue="">
          <option value="">Where to?</option>
          {destinations.map((d) => (
            <option value={d.slug} key={d.slug}>
              {d.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Type of stay</span>
        <select name="stay" defaultValue="">
          <option value="">Make it yours</option>
          <option value="shared">Shared Living</option>
          <option value="serviced">Serviced Stays</option>
        </select>
      </label>
      <label>
        <span>Preferred arrival</span>
        <input
          type="date"
          name="arrival"
          aria-label="Preferred arrival date"
          min={new Date().toLocaleDateString("en-CA")}
        />
      </label>
      <button type="submit" className="button">
        Find your place
      </button>
    </form>
  );
}

export function PlaceExplorer({ compact = false }: { compact?: boolean }) {
  const [country, setCountry] = useState("All destinations");
  const [query, setQuery] = useState("");
  const filtered = destinations.filter(
    (d) =>
      (country === "All destinations" || d.country === country) &&
      d.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className={`place-explorer ${compact ? "place-explorer-home" : ""}`}>
      <div className="explorer-controls">
        <div
          className="country-tabs"
          role="group"
          aria-label="Filter destinations"
        >
          {["All destinations", "United Kingdom", "Portugal"].map((c) => (
            <button
              key={c}
              aria-pressed={country === c}
              onClick={() => setCountry(c)}
            >
              {c}
            </button>
          ))}
        </div>
        {!compact && (
          <label className="destination-search">
            <span className="sr-only">Search destinations</span>
            <input
              type="search"
              value={query}
              placeholder="Find a destination"
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        )}
      </div>
      <p className="gallery-status" role="status">
        {filtered.length}{" "}
        {filtered.length === 1 ? "destination" : "destinations"} to explore. Our
        team confirms accommodation and availability.
      </p>
      <div className="places-grid">
        {filtered.map((d) => (
          <Link
            key={d.slug}
            className="place-item"
            href={`/destinations/${d.slug}`}
          >
            <Photo
              name={d.slug}
              alt={`Discover ${d.name}`}
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
            />
            <div className="place-copy">
              <h3>{d.name}</h3>
              <span>{d.country}</span>
              {!compact && <p>{d.description}</p>}
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h3>A different place in mind?</h3>
          <p>Try another destination, or tell us where you’d like to go.</p>
          <div className="button-row">
            <button
              type="button"
              className="button button-secondary"
              onClick={() => {
                setCountry("All destinations");
                setQuery("");
              }}
            >
              Clear filters
            </button>
            <Link href="/contact" className="button">
              Make an enquiry
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
