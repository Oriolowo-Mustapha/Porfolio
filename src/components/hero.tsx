import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Label } from "@/components/primitives";
import { RolesRotator } from "@/components/roles-rotator";
import { site } from "@/lib/site";

/**
 * Home hero: who he is, what he does, and the three headline numbers.
 *
 * Structure adapted from 21st.dev `hero-04` (Editorial Collage): two columns,
 * serif headline, description, paired CTAs, layered media over a soft wash.
 * Entrances use CSS rather than motion so they run off the main thread and
 * cannot flash unhydrated `opacity: 0` content.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-rule">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <Label className="reveal">
            {site.role} — {site.location}
          </Label>

          <h1
            id="hero-heading"
            className="font-display reveal mt-5 text-[clamp(3rem,10vw,5.75rem)]"
          >
            Oriolowo
            <br />
            Mustapha<span className="text-signal">.</span>
          </h1>

          <RolesRotator />

          <p className="reveal mt-7 max-w-lg text-lg leading-relaxed text-ink-muted sm:text-xl">
            I build{" "}
            <span className="text-ink">secure, scalable backends</span> with{" "}
            <span className="text-ink">C#/.NET</span> and{" "}
            <span className="text-ink">TypeScript/Node.js</span> — architecting
            systems that stay maintainable long after they ship.
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
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

          <dl className="reveal mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-rule pt-6">
            <Stat value={`${site.yearsExperience}+`} label="Years" />
            <Stat value="07" label="Projects" />
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
        </div>

        {/* Collage: one plate, one overlapping inset — the overlap is what
            makes it read as paper laid on paper rather than a layout.
            `grayscale` keeps the plate's purple out of a palette that bans it. */}
        <div className="relative w-full pb-10 lg:pb-0">
          <div className="reveal relative aspect-square w-full overflow-hidden rounded-sm border border-rule bg-paper-raised sm:aspect-4/3 lg:aspect-square">
            <Image
              src="/hero.webp"
              alt="Abstract illustration of three stacked, offset layers — a diagram of the layered architecture approach."
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 92vw"
              className="object-contain grayscale"
            />
          </div>

          <div
            aria-hidden
            className="reveal absolute bottom-0 left-0 aspect-4/3 w-44 overflow-hidden rounded-sm border border-rule bg-paper-raised sm:-bottom-4 sm:left-4 lg:-bottom-6 lg:-left-6 lg:w-56"
          >
            <Image
              src="/agroguardian.webp"
              alt=""
              fill
              sizes="224px"
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