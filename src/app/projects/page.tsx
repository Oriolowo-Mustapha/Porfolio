import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProjectIndex } from "@/components/project-index";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `All ${projects.length} projects by ${site.name} — AI verification, cooperative fintech, security infrastructure, and backend systems.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${site.name}`,
    description: `All ${projects.length} projects by ${site.name}.`,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <div className="border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-5 pt-12 pb-16 sm:px-8">
          <Link
            href="/"
            className="label group inline-flex items-center gap-1.5 text-ink-muted hover:text-ink"
          >
            <ArrowLeft
              className="size-3 transition-transform duration-200 ease-out-expo group-hover:-translate-x-0.5"
              aria-hidden
            />
            Index
          </Link>
          <h1 className="font-display mt-6 text-[clamp(2.5rem,7vw,4.5rem)]">
            Projects<span className="text-signal">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-ink-muted">
            {projects.length} builds, indexed. Each entry opens a full brief —
            the problem, the architecture, and the links.
          </p>
        </div>
      </div>

      <ProjectIndex />
    </>
  );
}
