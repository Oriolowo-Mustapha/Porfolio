"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Header carries only identity and the one conversion action. Navigation
 * lives in NavDock at every viewport, so duplicating it here would mean two
 * presentations of the same five links drifting out of sync.
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
        "sticky top-0 z-30 w-full border-b transition-colors duration-200",
        scrolled
          ? "border-rule bg-paper/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="pressable font-display text-xl tracking-tight"
        >
          {site.shortName}
          <span className="text-signal">.</span>
        </Link>

        <a
          href={site.resumeUrl}
          download
          className="label pressable rounded-sm border border-rule px-3 py-2 text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-paper"
        >
          Résumé
        </a>
      </div>
    </header>
  );
}