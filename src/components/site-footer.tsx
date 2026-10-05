import { Mail } from "lucide-react";

import { Rule } from "@/components/primitives";
import { site } from "@/lib/site";

export function Footer() {
  // Build-time year is correct here: a portfolio footer only needs to be
  // right when it was built, and a client component for one integer is waste.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-3xl">
              {site.shortName}
              <span className="text-signal">.</span>
            </p>
            <a
              href={`mailto:${site.email}`}
              className="label link-underline mt-2 inline-block text-ink-muted hover:text-ink"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="label link-underline text-ink-muted hover:text-ink"
            >
              GitHub
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="label link-underline text-ink-muted hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href={site.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="label link-underline text-ink-muted hover:text-ink"
            >
              X
            </a>
            <a
              href={`mailto:${site.email}`}
              className="label link-underline text-ink-muted hover:text-ink"
            >
              Email
            </a>
          </nav>
        </div>

        <Rule className="my-8" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {year} {site.name}
          </p>
          <p className="label flex items-center gap-2">
            <Mail className="size-3" aria-hidden />
            {site.location} · Remote · {site.availability}
          </p>
        </div>
      </div>
    </footer>
  );
}
