import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
const display = localFont({
  src: "../public/fonts/bodoni-400.ttf",
  variable: "--font-display",
  display: "swap",
});
const sans = localFont({
  src: [
    { path: "../public/fonts/dm-sans-400.ttf", weight: "400" },
    { path: "../public/fonts/dm-sans-500.ttf", weight: "500" },
    { path: "../public/fonts/dm-sans-600.ttf", weight: "600" },
  ],
  variable: "--font-sans",
  display: "swap",
});
const deploymentHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Your Best Place — A better kind of stay.",
    template: "%s — Your Best Place",
  },
  description:
    "Beautifully considered shared living and serviced stays. Explore Your Best Place destinations across the United Kingdom and Portugal.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Your Best Place — A better kind of stay.",
    description: "Thoughtfully designed spaces to live, stay and feel at home.",
    images: [{ url: "/images/artful-living.webp", width: 1280, height: 854 }],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${display.variable} ${sans.variable}`}>
      <body id="top">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
