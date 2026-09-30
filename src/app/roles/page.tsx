import type { Metadata } from "next";

import { Experience } from "@/components/about-sections";
import { PageBody, PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roles",
  description: `Professional roles held by ${site.name}, from backend engineering at HNG Tech to contract work on the Resumeefy Jobs platform.`,
  alternates: { canonical: "/roles" },
  openGraph: {
    title: `Roles — ${site.name}`,
    description: `Professional roles and experience held by ${site.name}.`,
    url: "/roles",
  },
};

export default function RolesPage() {
  return (
    <>
      <PageHero
        numeral="02"
        eyebrow="Roles"
        title="Roles held"
        lede="Backend engineering across contract and internship work — REST APIs, background processing, and clean architecture."
      />
      <PageBody>
        <Experience />
      </PageBody>
    </>
  );
}