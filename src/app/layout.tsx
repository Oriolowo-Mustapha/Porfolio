import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { NavDock } from "@/components/ui/nav-dock";
import { site } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aphabase.dev"),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Oriolowo Mustapha",
    "Apha",
    "Software Engineer",
    "Backend Engineer",
    "C#",
    ".NET",
    "TypeScript",
    "Node.js",
    "Clean Architecture",
    "CQRS",
    "AI Integration",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full`}
    >
      {/* Bottom padding clears the dock, which only exists below `lg`. From
          `lg` up the navigation is in the sticky header, so the dock's height
          is not owed any space. */}
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased pb-24 lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-sm focus:border focus:border-ink focus:bg-paper-raised focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <SiteHeader />
        {/* Rendered on every route but hidden from `lg` up by NavDock itself, so
            primary navigation sits in one landmark per viewport, never two. */}
        <NavDock />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
