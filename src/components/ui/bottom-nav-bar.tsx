"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
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

/**
 * Width of an expanded label on the collapsed (mobile) pill. The labels are
 * "Home", "About", "Roles", "Skills", "Say hello", "Résumé" — 72px holds the
 * longest of those at 13px without clipping, and nothing else is used in the
 * nav, so the number can be a constant rather than a measurement pass.
 */
const MOBILE_LABEL_WIDTH = 72;

const icons: Record<string, LucideIcon> = {
  home: House,
  about: User,
  roles: Briefcase,
  skills: Blocks,
  contact: MessageCircle,
  resume: FileText,
};

type BottomNavBarProps = {
  className?: string;
  /**
   * Show every label, not just the active one. Used above the mobile
   * breakpoint, where there is room for the full set.
   */
  expanded?: boolean;
  /** Pin to the bottom of the viewport. Used on mobile. */
  stickyBottom?: boolean;
};

/**
 * One navigation pill, two presentations.
 *
 * Mobile: a fixed pill at the bottom of the viewport, inactive items collapsed
 * to 44px icon wells and the active one springing open to reveal its label —
 * thumb-reachable, which is the entire point of putting it at the bottom.
 *
 * Everything wider: the same pill expanded, every label showing, centred in
 * the header. `expanded` deliberately does not animate the label width. There is
 * nothing to animate — the set of labels never changes — and animating toward
 * `"auto"` is what previously left labels stuck at zero width on this project.
 * Static auto width also means no label can ever be clipped by a fixed pixel
 * guess.
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
  expanded = false,
  stickyBottom = false,
}: BottomNavBarProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

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
            expanded={expanded}
            reduce={!!reduce}
          >
            <Icon size={20} strokeWidth={1.8} aria-hidden className="shrink-0" />
          </NavItem>
        );
      })}

      {/* Résumé is a file, not a route. It opens in the browser rather than
          downloading — the visitor may want to read it or hit ctrl-F in it —
          and because it is not a route it never reads as the current page. */}
      <NavItem href={site.resumeUrl} label="Résumé" isActive={false} expanded={expanded} reduce={!!reduce} external>
        <FileText size={20} strokeWidth={1.8} aria-hidden className="shrink-0" />
      </NavItem>
    </nav>
  );
}

function NavItem({
  href,
  label,
  isActive,
  expanded,
  reduce,
  external,
  children,
}: {
  href: string;
  label: string;
  isActive: boolean;
  expanded: boolean;
  reduce: boolean;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className = cn(
    "pressable flex h-11 items-center rounded-full px-3",
    "transition-colors duration-200",
    isActive
      ? "bg-dock-active text-ink"
      : "text-ink-muted hover:text-ink",
  );

  const inner = (
    <>
      {children}
      <NavLabel label={label} open={isActive} expanded={expanded} reduce={reduce} />
    </>
  );

  return external ? (
    // Plain anchor, not <Link>: /resume.pdf is a file, and client-side routing
    // to it would try to render the response as a page instead of handing it to
    // the browser's PDF viewer.
    <a href={href} className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} aria-current={isActive ? "page" : undefined} className={className}>
      {inner}
    </Link>
  );
}

function NavLabel({
  label,
  open,
  expanded,
  reduce,
}: {
  label: string;
  open: boolean;
  expanded: boolean;
  reduce: boolean;
}) {
  // Expanded pill: always visible, natural width, nothing to animate. No
  // aria-hidden — a screen reader should hear the link name at every viewport.
  if (expanded) {
    return (
      <span className="ml-2 whitespace-nowrap text-sm font-medium leading-none">
        {label}
      </span>
    );
  }

  return (
    <motion.span
      initial={false}
      animate={{ width: open ? MOBILE_LABEL_WIDTH : 0, opacity: open ? 1 : 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              width: { type: "spring", stiffness: 350, damping: 32 },
              opacity: { duration: 0.19 },
            }
      }
      className="overflow-hidden"
    >
      <span className="block whitespace-nowrap text-[13px] font-medium leading-none">
        {label}
      </span>
    </motion.span>
  );
}

export default BottomNavBar;