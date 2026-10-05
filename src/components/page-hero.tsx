import { Label, Rule } from "@/components/primitives";

/**
 * Shared header for sub-routes. Every page opens the same way — a folio
 * numeral, a small caps eyebrow, the title set in the display serif, a
 * standfirst, and a hairline — so moving between pages feels like turning a
 * leaf rather than landing somewhere new.
 */
export function PageHero({
  numeral,
  eyebrow,
  title,
  lede,
}: {
  numeral: string;
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16">
        <div className="flex items-baseline gap-4">
          <Label className="text-signal tabular-nums">{numeral}</Label>
          <Label>{eyebrow}</Label>
        </div>

        <h1 className="font-display mt-5 text-[clamp(2.75rem,8vw,5rem)]">
          {title}
          <span className="text-signal">.</span>
        </h1>

        <Rule className="mt-8 max-w-md" />

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
          {lede}
        </p>
      </div>
    </header>
  );
}

/** Wrapper giving a page's body the standard measure and rhythm. */
export function PageBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}