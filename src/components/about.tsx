import { Label, SectionHeading } from "@/components/primitives";
import { bio, site } from "@/lib/site";

/** Renders prose with a set of phrases emphasised. Splitting on the emphasis
    list means the markup stays declarative — no inline JSX in the data. */
function Prose({ text, emphasis }: { text: string; emphasis: readonly string[] }) {
  if (!emphasis.length) return <>{text}</>;

  const pattern = new RegExp(
    `(${emphasis.map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );

  return (
    <>
      {text.split(pattern).map((part, i) =>
        emphasis.includes(part) ? (
          <strong key={i} className="font-medium text-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-rule"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading label="About" numeral="05" />
        <h2 id="about-heading" className="sr-only">
          About
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <Label>Origin</Label>
            <p className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
              {site.degree}, {site.university.split(" (")[0]}.
            </p>
            <p className="label mt-5">
              {site.yearsExperience}+ years · {site.role}
            </p>
          </div>

          <div className="max-w-[68ch] space-y-6 text-lg leading-relaxed text-ink-muted">
            {bio.map((p) => (
              <p key={p.text.slice(0, 24)}>
                <Prose text={p.text} emphasis={p.emphasis} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
