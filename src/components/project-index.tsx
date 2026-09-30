import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Label, SectionHeading } from "@/components/primitives";
import { projects, type Project } from "@/lib/projects";

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectIndex({ limit }: { limit?: number }) {
  const list = (limit ? projects.slice(0, limit) : projects) as readonly Project[];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-b border-rule"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading label="Selected work" numeral="01" />
        <h2 id="work-heading" className="sr-only">
          Selected work
        </h2>

        <p className="mt-6 max-w-xl text-ink-muted">
          Flagship builds spanning AI verification, security infrastructure,
          cooperative fintech, and organisational tooling.
        </p>

        <ol className="mt-14 border-t border-rule">
          {list.map((p, i) => (
            <li key={p.slug}>
              <ProjectRow project={p} index={i + 1} />
            </li>
          ))}
        </ol>

        {limit ? (
          <Link
            href="/projects"
            className="pressable group mt-10 inline-flex items-center gap-2 text-sm"
          >
            <span className="link-underline">All {projects.length} projects</span>
            <ArrowUpRight
              className="size-4 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex items-start gap-4 border-b border-rule py-7 transition-colors duration-150 sm:gap-6 hover:bg-paper-raised sm:px-4 sm:-mx-4"
    >
      <span className="label mt-2 w-7 shrink-0 tabular-nums text-signal">
        {pad(index)}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-2xl sm:text-3xl">{project.title}</h3>
        <p className="label mt-2">{project.category}</p>
        <p className="mt-4 max-w-2xl text-ink-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <li key={s} className="label">
              {s}
            </li>
          ))}
          {project.stack.length > 5 ? (
            <li className="label">+{project.stack.length - 5}</li>
          ) : null}
        </ul>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {project.backendOnly ? (
          <span className="label rounded-sm border border-rule px-2 py-1">
            Backend
          </span>
        ) : null}
        <ArrowUpRight
          className="mt-1 size-4 text-ink-faint transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
          aria-hidden
        />
      </div>

      {/* Thumbnail reveals on hover at desktop only. Gated by the `group`
          class plus the `hidden` at small widths, so touch never triggers it. */}
      {project.image ? (
        <div
          aria-hidden
          className="pointer-events-none absolute right-12 top-1/2 hidden size-40 -translate-y-1/2 overflow-hidden rounded-sm border border-rule opacity-0 shadow-none transition-opacity duration-200 ease-out-expo group-hover:opacity-100 lg:block xl:size-48"
        >
          <Image
            src={project.image}
            alt=""
            fill
            sizes="192px"
            className="object-cover"
          />
        </div>
      ) : null}
    </Link>
  );
}

export { Label as ProjectLabel };
