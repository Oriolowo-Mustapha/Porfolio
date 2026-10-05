import { Mail } from "lucide-react";

import { Rule } from "@/components/primitives";
import { SocialLink, socialLinks } from "@/components/social-icons";
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

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <nav aria-label="Social profiles" className="flex gap-2.5">
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.network}
                  network={social.network}
                  label={social.label}
                  href={social.href}
                />
              ))}
            </nav>
            <a
              href={`mailto:${site.email}`}
              className="label link-underline text-ink-muted hover:text-ink"
            >
              Email
            </a>
          </div>
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
