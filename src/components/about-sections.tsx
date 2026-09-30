import { Leader } from "@/components/primitives";
import { experience, skills as skillGroups, site } from "@/lib/site";

/**
 * Maps a skill name to a monogram. Brand marks are out of scope for a text
 * glyph set; a neutral monogram per language is honest and consistent, where
 * borrowing third-party brand SVGs would reintroduce the CDN dependency this
 * project removed.
 */
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

/** Skills body. Rendered by /skills, which owns the page chrome. */
export function Stack() {
  return (
    <section aria-labelledby="stack-heading">
      <h2 id="stack-heading" className="label">
        The stack
      </h2>

      <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {skillGroups.map((group) => (
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
          Pursuing a degree in {site.degree} at {site.university}, alongside
          production work. Particularly interested in the intersection of
          software and AI integration.
        </p>
      </div>
    </section>
  );
}

/** Experience timeline. Rendered by /roles, which owns the page chrome. */
export function Experience() {
  return (
    <section aria-labelledby="roles-heading">
      <h2 id="roles-heading" className="label">
        Positions
      </h2>

      <ol className="mt-8 space-y-14">
        {experience.map((job) => (
          <li
            key={`${job.org}-${job.start}`}
            className="grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-10"
          >
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
                  <li key={b} className="flex gap-3 text-ink-muted">
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
          </li>
        ))}
      </ol>
    </section>
  );
}