"use client";

import type { ImageLoaderProps } from "next/image";

// Static hosting uses pre-generated WebP derivatives instead of a server endpoint.
export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (src.startsWith("/images/") && src.endsWith(".webp") && width <= 828) {
    return src.replace(/\.webp$/, "-800.webp");
  }
  return src;
}
