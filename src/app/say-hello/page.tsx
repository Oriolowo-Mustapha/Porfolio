import type { Metadata } from "next";

import { Contact } from "@/components/contact";
import { PageBody, PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Say hello",
  description: `Get in touch with ${site.name} — ${site.location}, available ${site.availability}. Projects, stack deep-dives, or just to say hi.`,
  alternates: { canonical: "/say-hello" },
  openGraph: {
    title: `Say hello — ${site.name}`,
    description: `Get in touch with ${site.name}.`,
    url: "/say-hello",
  },
};

export default function SayHelloPage() {
  return (
    <>
      <PageHero
        numeral="04"
        eyebrow="Contact"
        title="Say hello"
        lede="Whether it’s a project, a stack deep-dive, or just to say hi — my digital door is always open."
      />
      <PageBody>
        <Contact />
      </PageBody>
    </>
  );
}