"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  User,
  Briefcase,
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
  contact: MessageCircle,
  resume: FileText,
};

/**
 * Which labels the pill shows.
 *
 * - `"icons"` — mobile. Nothing but icons. At the bottom of the screen the pill
 *   has to stay narrow and out of the way, and the labels used to cost 116px of
 *   the 314px pill for a link the thumb was already on top of.
 * - `"labels"` — desktop, where the header has the room and the words cost
 *   nothing.
 */
type NavVariant = "icons" | "labels";

type BottomNavBarProps = {
  className?: string;
  variant?: NavVariant;
  /** Pin to the bottom of the viewport. Used on mobile. */
  stickyBottom?: boolean;
};

/**
 * One navigation pill, two presentations.
 *
 * Mobile: a fixed pill at the bottom of the viewport, icons only — the narrowest
 * thing that is still thumb-reachable, which is the entire point of putting it
 * at the bottom.
 *
 * Everything wider: the same pill in the header with every label showing,
 * centred on the viewport.
 *
 * Either way the label is the accessible name, so it moves rather than
 * disappears: `"icons"` gives the link an `aria-label` and a `title` tooltip,
 * `"labels"` uses the rendered text. The word is never in the DOM twice, so a
 * screen reader announces "Home, link", not "Home Home".
 *
 * This is why the active item needs a real tonal step rather than leaning on
 * "the one with the word". On mobile nothing is written next to the icons, so
 * active state is carried by `aria-current="page"` plus the active icon in
 * `--ink` against `--ink-muted` on the others (2.78:1 between them), with
 * `--dock-active` filling behind it at 1.56:1 against the dock. Neither step
 * reaches 3:1 on its own — see the note in DESIGN.md before tightening either.
 *
 * Colours come from the paper tokens rather than the generic `bg-card` /
 * `bg-primary/10` defaults, so the pill reads as warm paper with an ochre-tinted
 * edge instead of a dark-mode surface that fights the rest of the design.
 *
 * Active state is the pathname. These are routes, not tabs, so there is nothing
 * for local component state to own — a `useState` index here would light up the
 * wrong item after any back/forward navigation or a direct URL load.
 */
export function BottomNavBar({
  className,
  variant = "icons",
  stickyBottom = false,
}: BottomNavBarProps) {
  const pathname = usePathname();
  const showLabels = variant === "labels";

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "pill-enter flex items-center gap-0.5 rounded-full p-1.5",
        "border border-dock-border bg-dock/85 backdrop-blur-xl",
        "shadow-[var(--dock-shadow)]",
        stickyBottom
          ? "fixed inset-x-0 bottom-4 z-40 mx-auto w-fit max-w-[95vw]"
          : "relative z-30",
        className,
      )}
    >
      {nav.map((item) => {
        const Icon = icons[item.icon] ?? House;
        return (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            isActive={pathname === item.href}
            showLabels={showLabels}
          >
            <Icon size={20} strokeWidth={1.8} aria-hidden className="shrink-0" />
          </NavItem>
        );
      })}

      {/* Résumé is a file, not a route. It opens in the browser rather than
          downloading — the visitor may want to read it or hit ctrl-F in it —
          and because it is not a route it never reads as the current page. */}
      <NavItem
        href={site.resumeUrl}
        label="Résumé"
        isActive={false}
        showLabels={showLabels}
        external
      >
        <FileText size={20} strokeWidth={1.8} aria-hidden className="shrink-0" />
      </NavItem>
    </nav>
  );
}

function NavItem({
  href,
  label,
  isActive,
  showLabels,
  external,
  children,
}: {
  href: string;
  label: string;
  isActive: boolean;
  showLabels: boolean;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className = cn(
    "pressable flex h-11 items-center rounded-full px-3",
    "transition-colors duration-200",
    isActive ? "bg-dock-active text-ink" : "text-ink-muted hover:text-ink",
  );

  const inner = (
    <>
      {children}
      {showLabels && (
        <span className="ml-2 whitespace-nowrap text-sm font-medium leading-none">
          {label}
        </span>
      )}
    </>
  );

  // With no rendered text the link would be unnamed, so the label moves onto the
  // anchor. `title` is the hover tooltip the visible text used to provide for
  // free; it never becomes the accessible name while `aria-label` is present,
  // so the two cannot fight.
  const naming = showLabels
    ? {}
    : { "aria-label": label, title: label };

  return external ? (
    // Plain anchor, not <Link>: the résumé PDF is a file, and client-side routing
    // to it would try to render the response as a page instead of handing it to
    // the browser's PDF viewer.
    <a href={href} className={className} {...naming}>
      {inner}
    </a>
  ) : (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={className}
      {...naming}
    >
      {inner}
    </Link>
  );
}

export default BottomNavBar;