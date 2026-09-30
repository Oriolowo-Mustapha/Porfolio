import { Leader, SectionHeading } from "@/components/primitives";
import { experience, skills, site } from "@/lib/site";

/** Maps a skill name to a lucide glyph. Brand marks are out of scope for
    lucide; a neutral glyph per language is honest and consistent, whereas
    borrowing third-party brand SVGs reintroduces the old CDN problem. */
const glyphs: Record<string, string> = {
  TypeScript: "TS",
  "C#": "#",
  Python: "Py",
  SQL: "DB",
  JavaScript: "JS",
  React: "Re",
  "Next.js": "Nx",
  "Tailwind CSS": "Tw",
  "TanStack Query": "Q",
  Zustand: "Z",
  "Node.js": "No",
  "ASP.NET Core": ".N",
  Express: "Ex",
  "EF Core": "EF",
  PostgreSQL: "Pg",
  MongoDB: "Mg",
  MySQL: "My",
};

export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="border-b border-rule"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading label="Technical stack" numeral="02" />
        <h2 id="stack-heading" className="sr-only">
          Technical stack
        </h2>

        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.label}>
              <h3 className="label">{group.label}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Leader>
                      <span className="flex items-center gap-2.5">
                        <span
                          aria-hidden
                          className="inline-flex size-6 shrink-0 items-center justify-center rounded-sm border border-rule font-mono text-[9px] tracking-tight text-ink-muted"
                        >
                          {glyphs[item.name] ?? item.name.slice(0, 2)}
                        </span>
                        <span className="text-sm text-ink">{item.name}</span>
                      </span>
                    </Leader>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-rule pt-8">
          <h3 className="label">Currently</h3>
          <p className="mt-3 max-w-xl text-ink-muted">
            Pursuing a degree in {site.degree} at {site.university},
            alongside production work. Particularly interested in the
            intersection of software and AI integration.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-b border-rule"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading label="Experience" numeral="03" />
        <h2 id="experience-heading" className="sr-only">
          Experience
        </h2>

        <ol className="mt-14 space-y-14">
          {experience.map((job, i) => (
            <li key={`${job.org}-${job.start}`} className="grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-10">
              <div className="flex items-center gap-3 sm:w-40 sm:flex-col sm:items-start sm:gap-2">
                <span
                  aria-hidden
                  className={
                    job.current
                      ? "size-1.5 rounded-full bg-signal motion-safe:animate-pulse"
                      : "size-1.5 rounded-full bg-rule-strong"
                  }
                />
                <span className="label tabular-nums">
                  {job.start} — {job.end}
                </span>
              </div>

              <div className="border-t border-rule pt-4 sm:border-0 sm:pt-0">
                <h3 className="font-display text-2xl">{job.role}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">
                  <span className="text-ink">{job.org}</span> · {job.kind} ·{" "}
                  {job.location}
                </p>

                <ul className="mt-5 max-w-2xl space-y-2.5">
                  {job.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-3 text-ink-muted"
                    >
                      <span aria-hidden className="text-signal">
                        —
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
                  {job.stack.map((s) => (
                    <li key={s} className="label">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="label sr-only">{i + 1}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
