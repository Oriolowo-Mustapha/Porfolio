import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Instrument_Serif } from "next/font/google";

import { Footer } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BottomNavBar } from "@/components/ui/bottom-nav-bar";
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

/**
 * Self-hosted rather than `next/font/google`, which was retrying
 * `fonts.googleapis.com` on every dev request and falling back to a system
 * mono whenever the network was slow. The file is the variable build from
 * `@fontsource-variable/jetbrains-mono`, so one 40KB woff2 covers the whole
 * weight axis and 400/500 need no separate files. Nothing is fetched at build or
 * request time, so dev is quiet and a cold or offline build still works.
 */
const jetbrainsMono = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
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
      {/* Bottom padding clears the pill, which is only rendered below `md`.
          From `md` up the header pill takes over, so the floating one is gone
          and owes no space. */}
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased pb-28 md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-sm focus:border focus:border-ink focus:bg-paper-raised focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <SiteHeader />
        {/* Mobile navigation, icons only. `hidden` from `md` up, where the
            header renders the labelled pill instead — one aria-label="Primary"
            per viewport. */}
        <div className="md:hidden">
          <BottomNavBar variant="icons" stickyBottom />
        </div>
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
