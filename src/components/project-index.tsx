import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Label } from "@/components/primitives";
import { getProject, projects, type Project, type ProjectSlug } from "@/lib/projects";

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectIndex({ slugs }: { slugs?: readonly ProjectSlug[] }) {
  return (
    <section id="work" aria-labelledby="work-heading" className="border-b border-rule">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex items-baseline gap-4">
          <Label className="text-signal tabular-nums">05</Label>
          <h2 id="work-heading" className="font-display text-3xl sm:text-4xl">
            Selected work
          </h2>
          <div aria-hidden className="mb-1.5 h-px flex-1 bg-rule" />
        </div>

        <p className="mt-6 max-w-xl text-ink-muted">
          Flagship builds spanning AI verification, security infrastructure,
          cooperative fintech, and organisational tooling.
        </p>

        <ProjectRows slugs={slugs} className="mt-14 border-t border-rule" />

        {slugs ? <AllProjectsLink className="mt-10" /> : null}
      </div>
    </section>
  );
}

/**
 * The project rows as a page body — a `label` heading and the list, with no
 * band chrome of its own.
 *
 * Split out of `ProjectIndex` because the two callers disagree about framing.
 * The home page wants a full band with a folio numeral and its own container;
 * `/roles` already sits inside a `PageHero` and a `PageBody`, so a nested
 * `max-w-[1200px]` band would double the gutters and carry a second "05" numeral
 * from a different sequence. The rows are identical either way, so only the
 * framing moved.
 *
 * Pass no `limit` to list everything and omit the link — there is nothing left
 * to link to. Pass a `limit` where the rest of the index is one click away.
 */
export function ProjectList({
  limit,
  heading = "Selected work",
}: {
  limit?: number;
  heading?: string;
}) {
  return (
    <>
      <h2 className="label">{heading}</h2>
      <ProjectRows limit={limit} className="mt-8 border-t border-rule" />
      {limit ? <AllProjectsLink className="mt-10" /> : null}
    </>
  );
}

function ProjectRows({
  limit,
  slugs,
  className,
}: {
  limit?: number;
  slugs?: readonly ProjectSlug[];
  className?: string;
}) {
  const list = (
    slugs
      ? slugs.flatMap((slug) => {
          const project = getProject(slug);
          return project ? [project] : [];
        })
      : limit
        ? projects.slice(0, limit)
        : projects
  ) as readonly Project[];

  return (
    <ol className={className}>
      {list.map((p, i) => (
        <li key={p.slug}>
          <ProjectRow project={p} index={i + 1} />
        </li>
      ))}
    </ol>
  );
}

function AllProjectsLink({ className }: { className?: string }) {
  return (
    <Link
      href="/projects"
      className={`pressable group inline-flex items-center gap-2 text-sm ${className ?? ""}`}
    >
      <span className="link-underline">All {projects.length} projects</span>
      <ArrowUpRight
        className="size-4 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </Link>
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
