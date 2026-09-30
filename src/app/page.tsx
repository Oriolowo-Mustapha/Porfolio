import { Hero } from "@/components/hero";
import { ProjectIndex } from "@/components/project-index";
import { site } from "@/lib/site";

/** Person schema so search engines and AI crawlers get a typed identity. */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.shortName,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.email}`,
  url: "https://aphabase.dev",
  sameAs: [site.links.github, site.links.linkedin, site.links.twitter],
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: site.university,
  },
  knowsAbout: [
    "C#",
    ".NET",
    "ASP.NET Core",
    "TypeScript",
    "Node.js",
    "Clean Architecture",
    "CQRS",
    "PostgreSQL",
    "MongoDB",
    "AI Integration",
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Hero />
      <ProjectIndex limit={3} />
    </>
  );
}