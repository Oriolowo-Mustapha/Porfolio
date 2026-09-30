import { cn } from "@/lib/utils";

export function Rule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-px w-full bg-rule", className)}
    />
  );
}

export function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("label", className)}>{children}</p>;
}

/** Section heading: a small caps label, an optional numeral, and a hairline. */
export function SectionHeading({
  label,
  numeral,
  className,
}: {
  label: string;
  numeral?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline gap-4", className)}>
      {numeral ? (
        <span className="label tabular-nums text-signal">{numeral}</span>
      ) : null}
      <h2 className="font-display text-3xl sm:text-4xl">{label}</h2>
      <Rule className="mb-1.5 flex-1" />
    </div>
  );
}

/** A dotted leader between a label and a value — a table of contents, printed. */
export function Leader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="shrink-0">{children}</span>
      <span
        aria-hidden
        className="h-px flex-1 translate-y-[-3px] bg-[repeating-linear-gradient(to_right,var(--rule-strong)_0_2px,transparent_2px_5px)]"
      />
    </div>
  );
}
