"use client";

import { useEffect, useState } from "react";

import { roleTitles } from "@/lib/site";
import { cn } from "@/lib/utils";

const ROTATE_MS = 2800;

/**
 * Rotating role titles in the hero.
 *
 * Accessibility notes:
 *  - The full list is rendered once for assistive tech in a visually hidden
 *    element, and the animated copy is `aria-hidden`. Otherwise the rotation
 *    would announce a different job title on every cycle.
 *  - Under `prefers-reduced-motion` nothing rotates; all four show at once.
 *  - Rotation is driven by an interval and paused while the tab is hidden, so
 *    a backgrounded tab does not keep a timer alive.
 */
export function RolesRotator() {
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce) return;

    const id = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setIndex((i) => (i + 1) % roleTitles.length);
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [reduce]);

  if (reduce) {
    return (
      <>
        <span className="sr-only">
          {roleTitles.join(", ")}.
        </span>
        <p aria-hidden className="font-display mt-6 text-2xl leading-tight sm:text-3xl">
          {roleTitles.map((r) => (
            <span key={r} className="block">
              {r}
            </span>
          ))}
        </p>
      </>
    );
  }

  return (
    <>
      <span className="sr-only">{roleTitles.join(", ")}.</span>
      <p
        aria-hidden
        className="font-display relative mt-6 h-[1.35em] overflow-hidden text-2xl leading-tight sm:text-3xl"
      >
        {roleTitles.map((role, i) => (
          <span
            key={role}
            className={cn(
              "absolute inset-0 transition-all duration-300 ease-out-expo",
              i === index
                ? "translate-y-0 opacity-100"
                : "-translate-y-1/2 opacity-0",
            )}
          >
            {role}
          </span>
        ))}
      </p>
    </>
  );
}