import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function Photo({
  name,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={`/images/${name}.webp`}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
      />
    </div>
  );
}

export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  href,
  children,
  light = false,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={`button ${light ? "button-light" : variant === "secondary" ? "button-secondary" : ""}`}
    >
      {children}
    </Link>
  );
}

export function Label({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}
