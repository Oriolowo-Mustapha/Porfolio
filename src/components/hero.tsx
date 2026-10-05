import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Label } from "@/components/primitives";
import { RolesRotator } from "@/components/roles-rotator";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * Home hero: who he is, what he does, and the three headline numbers.
 *
 * Two columns, a serif headline, description, paired CTAs, and a circular
 * portrait anchored beside the introductory copy. Entrances use CSS rather than
 * motion so they run off the main thread and cannot flash unhydrated
 * `opacity: 0` content.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-rule">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,1fr)_auto] items-start gap-x-5 gap-y-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-x-16 lg:gap-y-0">
        <div className="col-span-2 flex flex-col items-start lg:col-span-1 lg:col-start-1 lg:row-start-1">
          <Label className="reveal reveal-delay-1">
            {site.role} — {site.location}
          </Label>

          <h1
            id="hero-heading"
            className="font-display reveal reveal-delay-1 mt-4 text-[clamp(3rem,10vw,5.75rem)]"
          >
            Oriolowo
            <br />
            Mustapha<span className="text-signal">.</span>
          </h1>

          <RolesRotator />
        </div>

        <p className="reveal reveal-delay-2 col-start-1 max-w-lg text-lg leading-relaxed text-ink-muted sm:text-xl lg:row-start-2">
          Software engineer building{" "}
            <span className="text-ink">secure, scalable products</span> across
            the stack, from fintech and AI-powered platforms to polished
            interfaces, with <span className="text-ink">C#/.NET</span>,{" "}
            <span className="text-ink">TypeScript/Node.js</span>, and{" "}
            <span className="text-ink">React</span>.
          </p>

          <div className="reveal reveal-delay-3 col-span-2 mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 lg:col-span-1 lg:col-start-1 lg:row-start-3">
            <Link
              href="/projects"
              className="pressable group inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm text-paper transition-colors duration-150 hover:bg-signal"
            >
              View selected work
              <ArrowRight
                className="size-4 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="/about"
              className="pressable inline-flex items-center gap-2 rounded-sm border border-rule px-5 py-3 text-sm transition-colors duration-150 hover:border-ink"
            >
              More about me
            </Link>
            {/* No `download`: the PDF opens in the browser's viewer so it can be
                read and searched. ArrowUpRight rather than a download glyph,
                which would now contradict what the link does. */}
            <a
              href={site.resumeUrl}
              className="pressable inline-flex items-center gap-2 rounded-sm px-1 py-3 text-sm text-ink-muted transition-colors duration-150 hover:text-ink"
            >
              <ArrowUpRight className="size-4" aria-hidden />
              Résumé
            </a>
          </div>

          <dl className="reveal reveal-delay-4 col-span-2 mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-rule pt-6 lg:col-span-1 lg:col-start-1 lg:row-start-4">
            <Stat value={`${site.yearsExperience}+`} label="Years" />
            <Stat
              value={String(projects.length).padStart(2, "0")}
              label="Projects"
            />
            <div className="flex flex-col gap-1.5">
              <dt className="sr-only">Availability</dt>
              <dd className="flex items-center gap-1.5 font-mono text-2xl tabular-nums">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-signal motion-safe:animate-pulse"
                />
                Open
              </dd>
              <span className="label">Availability</span>
            </div>
          </dl>

        {/* Circular portrait beside the introductory copy on mobile and in its
            own right-hand column on desktop. The square source is cropped from
            the top so the circular frame keeps the face rather than centering
            on the background. */}
        <div className="col-start-2 row-start-2 mt-1 flex w-full justify-end lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:mt-0 lg:self-center">
          <div className="reveal reveal-delay-2 relative aspect-square w-28 shrink-0 overflow-hidden rounded-full border border-rule bg-paper-raised sm:w-36 lg:w-80">
            <Image
              src="/headshot.jpeg"
              alt="Portrait of Oriolowo Mustapha."
              fill
              priority
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 9rem, 7rem"
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dd className="font-mono text-2xl tabular-nums">{value}</dd>
      <dt className="label">{label}</dt>
    </div>
  );
}