"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { site, nav } from "@/lib/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const anchors = nav.map((n) => n.href.replace("/#", ""));

/**
 * One navigation bar for both viewports.
 *
 * Desktop (≥768px): the expanded inline row in the header, with a moving
 * underline that tracks the section in view.
 * Mobile (<768px): the same anchors rendered by BottomNavBar, pinned to the
 * bottom of the viewport where a thumb can reach them. The header keeps only
 * the wordmark and a Résumé link — a hamburger sheet would be a third way of
 * doing the same job.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(anchors);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
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

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex"
        >
          {nav.map((item) => {
            const id = item.href.replace("/#", "");
            const isActive = active === id;

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "label relative transition-colors duration-150",
                  isActive
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
                {/* Underline sits below the text so it cannot shift the
                    label's baseline when it appears. */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px bg-signal transition-transform duration-200 ease-out-expo",
                    isActive ? "w-full" : "w-0",
                  )}
                />
              </a>
            );
          })}

          <a
            href={site.resumeUrl}
            download
            className="label pressable rounded-sm border border-rule px-3 py-2 text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-paper"
          >
            Résumé
          </a>
        </nav>

        {/* Résumé stays reachable on mobile now that the hamburger is gone. */}
        <a
          href={site.resumeUrl}
          download
          className="label pressable rounded-sm border border-rule px-3 py-2 text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-paper md:hidden"
        >
          Résumé
        </a>
      </div>
    </header>
  );
}