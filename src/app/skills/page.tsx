import type { Metadata } from "next";

import { Stack } from "@/components/about-sections";
import { PageBody, PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skills",
  description: `Technical stack of ${site.name} — languages, frontend, backend, and databases used in production work.`,
  alternates: { canonical: "/skills" },
  openGraph: {
    title: `Skills — ${site.name}`,
    description: `Languages, frontend, backend, and databases used by ${site.name}.`,
    url: "/skills",
  },
};

export default function SkillsPage() {
  return (
    <>
      <PageHero
        numeral="03"
        eyebrow="Skills"
        title="Technical skills"
        lede="The tools I reach for. Grouped by the part of the system they serve, because a list of logos says nothing about how they fit together."
      />
      <PageBody>
        <Stack />
      </PageBody>
    </>
  );
}