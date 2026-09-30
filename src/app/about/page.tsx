import type { Metadata } from "next";

import { About } from "@/components/about";
import { PageBody, PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — a backend-focused Software Engineer building secure, scalable systems with C#/.NET and TypeScript/Node.js.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    description: `Background, approach, and current focus for ${site.name}.`,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        numeral="01"
        eyebrow="About"
        title="About me"
        lede="Three years of building backends that stay maintainable, and a Computer Science degree that keeps the theory honest."
      />
      <PageBody>
        <About />
      </PageBody>
    </>
  );
}