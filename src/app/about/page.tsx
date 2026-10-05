import type { Metadata } from "next";

import { About } from "@/components/about";
import { Stack } from "@/components/about-sections";
import { PageBody, PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — Software Engineer building secure, scalable products across the stack, from fintech and AI-powered platforms to polished interfaces.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About — ${site.name}`,
    description: `Biography, engineering focus, and technical stack for ${site.name}.`,
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
        lede="Three years building secure, scalable products across the stack — and a Computer Science degree that keeps the theory honest."
      />
      <PageBody>
        <About />
        <Stack />
      </PageBody>
    </>
  );
}