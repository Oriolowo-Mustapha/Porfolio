"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { BottomNavBar } from "@/components/ui/bottom-nav-bar";

/**
 * Header carries identity and — above the mobile breakpoint — the labelled
 * navigation pill, centred.
 *
 * Exactly one `aria-label="Primary"` exists at any viewport. Below `md` this
 * element renders only the wordmark and the pill in `layout.tsx` owns
 * navigation pinned to the bottom of the screen. From `md` up that pill is
 * hidden and the labelled one is rendered here. Both are in the DOM; only one
 * is ever displayed, so assistive tech never sees the same five links twice.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full transition-colors duration-200",
        scrolled ? "bg-paper/85 backdrop-blur-md" : "bg-transparent",
      )}
    >
      {/* Full-bleed row: the wordmark is pinned to the viewport's left edge and
          the pill is centred on the viewport, so the two are independent objects
          rather than items sharing a content column. The `1fr auto 1fr` tracks
          centre the pill by construction — a fixed-width spacer was tried first
          and drifted 7px off centre, because it depends on the measured width of
          the wordmark, which changes with the font. */}
      <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8">
        <Link
          href="/"
          className="pressable justify-self-start font-display text-xl tracking-tight"
        >
          {site.shortName}
          <span className="text-signal">.</span>
        </Link>

        <div className="hidden md:block">
          <BottomNavBar variant="labels" />
        </div>

        <span aria-hidden />
      </div>
    </header>
  );
}