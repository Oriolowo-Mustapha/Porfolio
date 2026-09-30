import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Label, Rule, SectionHeading } from "@/components/primitives";
import { getProject, projects } from "@/lib/projects";

/** Pre-renders every project at build time. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${project.category}`,
      description: project.description,
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const links = [
    project.demoUrl && { label: "Live demo", href: project.demoUrl },
    project.frontendUrl && { label: "Frontend", href: project.frontendUrl },
    project.backendUrl && { label: "Backend", href: project.backendUrl },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <article className="border-b border-rule">
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
        <Link
          href="/projects"
          className="label group inline-flex items-center gap-1.5 text-ink-muted hover:text-ink"
        >
          <ArrowLeft
            className="size-3 transition-transform duration-200 ease-out-expo group-hover:-translate-x-0.5"
            aria-hidden
          />
          All projects
        </Link>

        <header className="mt-8">
          <Label className="text-signal">{project.category}</Label>
          <h1 className="font-display mt-4 text-[clamp(2.5rem,7vw,4.5rem)]">
            {project.title}
            <span className="text-signal">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {project.description}
          </p>
        </header>

        {project.image ? (
          <div className="relative mt-12 aspect-16/7 w-full overflow-hidden rounded-sm border border-rule bg-paper-raised">
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              priority
              sizes="(min-width: 1200px) 1200px, 92vw"
              className="object-cover object-top"
            />
          </div>
        ) : null}

        {links.length ? (
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable group inline-flex items-center gap-1.5 text-sm"
              >
                <span className="link-underline">{l.label}</span>
                <ArrowUpRight
                  className="size-3.5 text-ink-faint transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </a>
            ))}
            {project.backendOnly ? (
              <span className="label self-center rounded-sm border border-rule px-2 py-1">
                Backend only
              </span>
            ) : null}
          </div>
        ) : null}

        <Rule className="mt-14" />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
          <div>
            <SectionHeading label="The brief" />
            <p className="mt-8 max-w-[68ch] text-lg leading-relaxed text-ink-muted">
              {project.longDescription}
            </p>

            <div className="mt-16">
              <SectionHeading label="Capabilities" />
              <dl className="mt-8 divide-y divide-rule border-y border-rule">
                {project.modules.map((m, i) => (
                  <div
                    key={m.title}
                    className="grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8"
                  >
                    <dt className="flex items-baseline gap-3">
                      <span className="label tabular-nums text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl">{m.title}</span>
                    </dt>
                    <dd className="text-ink-muted">{m.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <aside>
            <div className="lg:sticky lg:top-24">
              <h2 className="label">Stack</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-sm border border-rule px-2.5 py-1.5 font-mono text-xs text-ink-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <Rule className="my-8" />

              <h2 className="label">Filed under</h2>
              <p className="mt-3 text-sm text-ink-muted">{project.category}</p>
            </div>
          </aside>
        </div>

        <Link
          href={`/projects/${next.slug}`}
          className="group mt-20 block border-t border-rule pt-8"
        >
          <span className="label">Next project</span>
          <span className="font-display mt-3 block text-3xl transition-colors duration-150 group-hover:text-signal sm:text-4xl">
            {next.title}
            <ArrowUpRight
              className="ml-2 inline size-5 align-middle transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </Link>
      </div>
    </article>
  );
}
