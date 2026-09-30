"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section the reader is currently in, so navigation reflects
 * position rather than only the last tap.
 *
 * Two things this deliberately does not do:
 *
 * 1. It does not use IntersectionObserver. Those callbacks fire only when a
 *    section enters or leaves the observation band, so a fast programmatic
 *    jump — an anchor tap, or a restored scroll position — can settle without
 *    ever emitting the event that would correct the active item.
 *
 * 2. It does not iterate the nav in nav order. Nav order is editorial; DOM
 *    order is spatial. They disagree here (nav lists About before Experience,
 *    the document runs Experience then About), and assuming they match makes
 *    the highlight lag a section behind. Sections are therefore sorted by
 *    their real document offset before the search.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  // `ids` is rebuilt on every render by callers deriving it from module data.
  // Joining to a primitive keeps the dependency stable so listeners attach
  // once instead of being torn down on each render.
  const key = ids.join("|");

  useEffect(() => {
    const wanted = key.split("|");

    // Clears the fixed header, so a section becomes current as its top passes
    // under the header rather than once it has scrolled to the middle.
    //
    // Read from CSS rather than hardcoded: `scroll-padding-top` is what parks
    // an anchor tap at a given offset, so this must match it exactly. If the
    // two drift, a tapped link highlights the section *above* the one landed
    // on, because the tapped section never quite clears this threshold.
    const headerOffset = () => {
      const pad = parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop,
      );
      return Number.isFinite(pad) && pad > 0 ? pad : 80;
    };

    let timer = 0;

    const measure = () => {
      const HEADER = headerOffset();

      // Spatial order, not nav order.
      const sections = wanted
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)
        .sort((a, b) => a.offsetTop - b.offsetTop);

      let current = sections[0]?.id ?? wanted[0] ?? "";

      for (const el of sections) {
        if (el.getBoundingClientRect().top - HEADER <= 1) {
          current = el.id;
        } else {
          break;
        }
      }

      // At the very bottom of the page the final section may still sit below
      // the header, so claim it explicitly and keep the last item reachable.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom && sections.length > 0) {
        current = sections[sections.length - 1].id;
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    // Measured directly on scroll rather than throttled through
    // requestAnimationFrame. This reads a handful of cached layout rects, and
    // the browser already coalesces scroll events to roughly one per frame, so
    // the rAF gate bought nothing but a failure mode: where frames are scarce
    // — background tabs, throttled or headless environments — the active item
    // could stay stale for seconds because the measuring frame never came. The
    // trailing timer covers the case where scrolling stops mid-throttle.
    const onScroll = () => {
      measure();
      clearTimeout(timer);
      timer = window.setTimeout(measure, 120);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  return active;
}