"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  User,
  Briefcase,
  Blocks,
  MessageCircle,
  FileText,
  type LucideIcon,
} from "lucide-react";

import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  home: House,
  about: User,
  roles: Briefcase,
  skills: Blocks,
  contact: MessageCircle,
};

/**
 * Floating navigation dock — mobile only. From `lg` up the header renders the
 * primary list inline and this element is removed with `hidden`, so exactly one
 * `aria-label="Primary"` landmark exists at any viewport width.
 *
 * The label reveal is done with `grid-template-columns: 0fr → 1fr` rather than
 * an animated width. Two reasons: it needs no measurement pass and no inline
 * width style, so there is no second rule that can contradict it; and it is a
 * plain CSS transition, which runs off the main thread. An animated width here
 * previously had to be driven against measured pixel values because animating
 * to `"auto"` raced the collapse and left labels stuck at zero.
 *
 * Inactive labels collapse to nothing, so the dock is a row of 44×44 icon
 * wells and only the active item expands to show its name.
 *
 * Active state is the pathname. These are routes, not anchors, so there is
 * nothing to observe.
 */
export function NavDock({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 lg:hidden",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className,
      )}
    >
      <ul
        className={cn(
          "pointer-events-auto flex items-center gap-0.5 rounded-full",
          "border border-dock-border bg-dock/85 p-1.5 backdrop-blur-xl",
          "shadow-[var(--dock-shadow)]",
        )}
      >
        {nav.map((item) => {
          const Icon = icons[item.icon] ?? House;
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "pressable flex h-11 items-center rounded-full",
                  "text-ink-muted transition-colors duration-200 hover:text-ink",
                  "px-3",
                  // Gap and padding are driven off state rather than emitted
                  // as a competing utility, so there is only ever one rule.
                  isActive ? "gap-2 bg-dock-active px-4 text-ink" : "gap-0",
                )}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.6}
                  aria-hidden
                  className="shrink-0 transition-colors duration-200"
                />
                <Label text={item.label} open={isActive} />
              </Link>
            </li>
          );
        })}

        {/* Résumé is a download, not a route, so it never reads as "current".
            It lives in the pill because the reference shows it there. */}
        <li>
          <a
            href={site.resumeUrl}
            download
            className={cn(
              "pressable flex h-11 items-center rounded-full px-3",
              "gap-0 text-ink-muted transition-colors duration-200 hover:text-ink",
            )}
          >
            <FileText size={20} strokeWidth={1.6} aria-hidden className="shrink-0" />
            <Label text="Résumé" open={false} />
          </a>
        </li>
      </ul>
    </nav>
  );
}

/**
 * A label that collapses to zero width unless it is the active item.
 *
 * `0fr` resolves to `minmax(0, 0fr)`, which is what allows the track to
 * collapse; `1fr` would be `minmax(auto, 1fr)` and refuse. The inner span
 * needs `overflow-hidden` for the same reason — it caps the min-content
 * contribution so the track can actually reach zero.
 *
 * No `aria-hidden`. Collapsing a label is purely visual; the text stays in the
 * accessibility tree so the link is always named, at every viewport.
 */
function Label({ text, open }: { text: string; open: boolean }) {
  return (
    <span
      className={cn(
        "grid transition-[grid-template-columns,opacity] duration-200 ease-out-expo",
        open ? "grid-cols-[1fr] opacity-100" : "grid-cols-[0fr] opacity-0",
      )}
    >
      <span className="overflow-hidden whitespace-nowrap text-[13px] font-medium leading-none">
        {text}
      </span>
    </span>
  );
}

export default NavDock;