"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function Wordmark() {
  return (
    <span className="wordmark">
      <span>YOUR BEST</span>
      <span>PLACE.</span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const media = window.matchMedia("(min-width: 801px)");
    const onResize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      media.removeEventListener("change", onResize);
    };
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [
          toggle.current,
          ...Array.from(menu.current?.querySelectorAll<HTMLElement>("a") || []),
        ].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i === 0) {
          e.preventDefault();
          items.at(-1)?.focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          items[0]?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className={`header ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}
      >
        <Link href="/" className="brand-link" aria-label="Your Best Place home">
          <Wordmark />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link
            href="/places"
            aria-current={pathname === "/places" ? "page" : undefined}
          >
            Explore Places
          </Link>
          <Link href="/#our-living">Our Living</Link>
          <Link
            href="/our-story"
            aria-current={pathname === "/our-story" ? "page" : undefined}
          >
            Our Story
          </Link>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            Contact
          </Link>
        </nav>
        <Link href="/contact" className="button nav-enquire">
          Enquire
        </Link>
        <button
          className={`menu-toggle ${open ? "is-open" : ""}`}
          ref={toggle}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
        </button>
      </header>
      <div
        id="mobile-navigation"
        ref={menu}
        className={`mobile-menu ${open ? "is-open" : ""}`}
        inert={!open}
        aria-hidden={!open}
      >
        <p className="eyebrow">Make yourself at home</p>
        <nav aria-label="Mobile navigation">
          <Link href="/places" onClick={() => setOpen(false)}>
            Explore Places
          </Link>
          <Link href="/#our-living" onClick={() => setOpen(false)}>
            Our Living
          </Link>
          <Link href="/our-story" onClick={() => setOpen(false)}>
            Our Story
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
        <a href="mailto:info@yourbestplace.co.uk">info@yourbestplace.co.uk</a>
        <a href="tel:+448000862456">0800 086 2456</a>
      </div>
    </>
  );
}
