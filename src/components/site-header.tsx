"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Header carries identity on mobile and the full primary navigation on desktop.
 *
 * One `aria-label="Primary"` exists at every viewport: below `lg` this element
 * renders only the wordmark and the dock at the bottom owns navigation; from
 * `lg` up the inline list is rendered and the dock is hidden. Two landmarks
 * carrying the same five links in the accessibility tree at once would be a
 * duplicate-navigation problem, so exactly one is present at any width.
 *
 * The desktop list is label-only, not icon-plus-label. Icons earned their place
 * in the dock because a row of five identical-looking wells needs them to be
 * distinguishable; a text list at full size is already unambiguous, and the
 * extra glyphs would only crowd the measure.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="pressable shrink-0 font-display text-xl tracking-tight"
        >
          {site.shortName}
          <span className="text-signal">.</span>
        </Link>

        {/* Desktop navigation. The Résumé link moves in here at the same
            breakpoint the dock leaves, so it is never presented twice. */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "pressable relative block rounded-sm px-3 py-2 text-sm",
                      "transition-colors duration-150",
                      isActive
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    {/* The active marker is an underline rather than a fill:
                        this row sits on a hairline-ruled header, and a filled
                        pill here would fight that rule. */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-px origin-left",
                        "bg-signal transition-transform duration-300 ease-out-expo",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}

            <li className="ml-2 border-l border-rule pl-3">
              <a
                href={site.resumeUrl}
                download
                className="pressable label rounded-sm border border-rule px-3 py-2 text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-paper"
              >
                Résumé
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}