"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  House,
  FolderGit2,
  User,
  Briefcase,
  Mail,
  type LucideIcon,
} from "lucide-react";

import { useActiveSection } from "@/hooks/use-active-section";
import { useAnchoredLinks } from "@/lib/scroll";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Icons are keyed by anchor id, not array position, so this list cannot
    silently attach the wrong glyph if `nav` is reordered. */
const icons: Record<string, LucideIcon> = {
  index: House,
  work: FolderGit2,
  about: User,
  experience: Briefcase,
  contact: Mail,
};

const anchors = nav.map((n) => n.href.replace("/#", ""));

/**
 * Floating navigation dock — one component for every viewport.
 *
 * A pill resting on the page: items are icon-only wells until one is active,
 * and the active item grows to reveal its label on a filled pill.
 *
 * Sizing note. The anchor carries no `w-*` utility. Width comes entirely from
 * the animated label span, so an item grows with its own content and there is
 * no second width rule to contradict it. An earlier version used `w-11` plus a
 * conditional `sm:w-auto`, and because Tailwind resolves conflicting
 * utilities by stylesheet order rather than class order, the active item
 * silently stayed collapsed at desktop widths. `min-w-11` is safe alongside
 * this because it only sets a floor.
 *
 * Label widths are measured rather than animated to `"auto"`. Motion has to
 * take its own measurement pass when the target is `auto`, and that races the
 * collapse: the label intermittently ended up stuck at zero width. Measuring
 * once and animating to a pixel value removes the race entirely.
 */
export function NavDock({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const active = useActiveSection(anchors);
  const onLinkClick = useAnchoredLinks();
  const listRef = useRef<HTMLUListElement>(null);
  const [widths, setWidths] = useState<Record<string, number>>({});

  // Measure every label's natural width, then animate to those numbers.
  // Re-measured on resize because a wider viewport can change wrapping or
  // sub-pixel rounding even though these labels never wrap.
  useLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current;
      if (!list) return;

      const next: Record<string, number> = {};
      list.querySelectorAll<HTMLElement>("[data-label]").forEach((el) => {
        const id = el.dataset.label;
        if (id) next[id] = el.scrollWidth;
      });

      setWidths((prev) => {
        const same =
          Object.keys(next).length === Object.keys(prev).length &&
          Object.entries(next).every(([k, v]) => prev[k] === v);
        return same ? prev : next;
      });
    };

    measure();

    // Web fonts land after first paint and change label widths.
    void document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <motion.nav
      aria-label="Primary"
      initial={false}
      animate={reduce ? undefined : { y: 0, opacity: 1 }}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className,
      )}
    >
      <ul
        ref={listRef}
        className={cn(
          "pointer-events-auto flex items-center gap-1 rounded-full",
          "border border-dock-border bg-dock/85 p-1.5 backdrop-blur-xl",
          "shadow-[var(--dock-shadow)]",
        )}
      >
        {nav.map((item) => {
          const id = item.href.replace("/#", "");
          const Icon = icons[id] ?? House;
          const isActive = active === id;
          const labelWidth = widths[id] ?? 0;
          // Until measured, or if measuring returned nothing, snap the label
          // open rather than animating toward a zero width.
          const measured = labelWidth > 0;

          return (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onLinkClick}
                aria-current={isActive ? "true" : undefined}
                title={item.label}
                className={cn(
                  "pressable relative flex h-11 min-w-11 items-center rounded-full sm:h-12",
                  "text-ink-muted transition-colors duration-200 hover:text-ink",
                  "justify-center px-2.5",
                  isActive &&
                    "justify-start bg-dock-active px-3.5 text-ink sm:px-4",
                )}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.6}
                  aria-hidden
                  className="shrink-0 transition-colors duration-200"
                />

                <motion.span
                  data-label={id}
                  initial={false}
                  animate={{
                    // Width is part of the target in both motion modes; only
                    // the transition differs. Reduced motion collapses to a
                    // 120ms fade. Animating opacity alone would leave the
                    // active item permanently unlabelled, which is worse
                    // than no motion at all.
                    width: isActive
                      ? measured
                        ? labelWidth
                        : "auto"
                      : 0,
                    opacity: isActive ? 1 : 0,
                    marginLeft: isActive ? 8 : 0,
                  }}
                  transition={
                    reduce
                      ? { duration: 0.12 }
                      : {
                          // A short tween rather than a spring. The label has a
                          // known width, so there is nothing for a spring to
                          // resolve, and a spring on `width` needs many frames
                          // to look settled — which reads as lag on any machine
                          // that is not comfortably hitting 60fps. 220ms with
                          // the site's own ease-out curve matches the rest of
                          // the motion budget in DESIGN.md.
                          duration: 0.22,
                          ease: [0.23, 1, 0.32, 1],
                        }
                  }
                  className={cn(
                    "inline-block overflow-hidden whitespace-nowrap text-ink",
                    "text-[13px] font-medium leading-none sm:text-sm",
                  )}
                >
                  {item.label}
                </motion.span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}

export default NavDock;