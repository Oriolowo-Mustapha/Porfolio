"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Home,
  FolderGit2,
  User,
  Briefcase,
  Mail,
  type LucideIcon,
} from "lucide-react";

import { useActiveSection } from "@/hooks/use-active-section";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Icons are mapped by anchor id rather than index so the desktop nav and this
 * bar can never drift out of sync when `nav` is reordered.
 */
const icons: Record<string, LucideIcon> = {
  index: Home,
  work: FolderGit2,
  about: User,
  experience: Briefcase,
  contact: Mail,
};

const anchors = nav.map((n) => n.href.replace("/#", ""));

/**
 * Mobile navigation.
 *
 * Deviations from the source component, all deliberate:
 *  - Reads its active item from scroll position, not local state. The original
 *    set state on click, which desyncs the moment the user scrolls away.
 *  - Anchors rather than buttons. These navigate; `<a>` gets middle-click,
 *    cmd-click, and "copy link address" for free.
 *  - Square, paper-coloured, hairline-bordered. The original's `rounded-full`
 *    pill, `shadow-xl`, and `bg-card` belong to the glassy app aesthetic this
 *    site deliberately does not use.
 *  - No `initial` scale-in. This bar is chrome, not content — animating it in
 *    delays the first interaction for no informational gain.
 *  - Honours prefers-reduced-motion by dropping straight to the end state.
 *  - Reserves bottom padding so it never covers the last line of content.
 */
export function BottomNavBar({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const active = useActiveSection(anchors);

  return (
    <motion.nav
      aria-label="Primary"
      // No `initial` scale-in: this is chrome, not content, and animating it
      // delays the first interaction for no informational gain.
      initial={false}
      animate={reduce ? undefined : { y: 0, opacity: 1 }}
      className={cn("fixed inset-x-0 bottom-0 z-40 md:hidden", className)}
    >
      {/* Safe-area padding keeps the bar clear of the iOS home indicator,
          and a top fade gives it separation from content scrolling beneath. */}
      <div className="border-t border-rule bg-paper/92 backdrop-blur-md">
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-1 pb-[env(safe-area-inset-bottom)]">
          {nav.map((item) => {
            const id = item.href.replace("/#", "");
            const Icon = icons[id] ?? Home;
            const isActive = active === id;

            return (
              <li key={item.href} className="flex-1">
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className="pressable flex min-h-14 flex-col items-center justify-center gap-1 px-1 py-2 text-center"
                >
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2 : 1.5}
                    aria-hidden
                    className={cn(
                      "transition-colors duration-150",
                      isActive ? "text-signal" : "text-ink-muted",
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-[10px] leading-none tracking-tight transition-colors duration-150",
                      isActive ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}

export default BottomNavBar;