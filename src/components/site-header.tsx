"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { site, nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet, and close it on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label text-ink-muted transition-colors duration-150 hover:text-ink focus-visible:text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.resumeUrl}
            download
            className="label pressable rounded-sm border border-rule px-3 py-2 text-ink transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-paper"
          >
            Résumé
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="pressable -mr-2 flex size-10 items-center justify-center md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile sheet. Entrance is opacity + a 10px rise, 220ms ease-out —
          fast enough to feel like the page answering, not animating at you. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-rule bg-paper md:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 py-2">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 30}ms` }}
              className="border-b border-rule py-3 font-display text-2xl last:border-0"
            >
              {item.label}
            </a>
          ))}
          <a
            href={site.resumeUrl}
            download
            onClick={() => setOpen(false)}
            className="label pressable my-4 rounded-sm border border-rule px-4 py-3 text-center"
          >
            Download résumé
          </a>
        </nav>
      </div>
    </header>
  );
}
