import { Label } from "@/components/primitives";
import { bio, site } from "@/lib/site";

/**
 * Renders prose with a set of phrases emphasised. Splitting on the emphasis
 * list keeps the markup declarative — no inline JSX inside the data module.
 */
function Prose({
  text,
  emphasis = [],
  signal = [],
}: {
  text: string;
  emphasis?: readonly string[];
  signal?: readonly string[];
}) {
  const terms = [...emphasis, ...signal];
  if (!terms.length) return <>{text}</>;

  const pattern = new RegExp(
    `(${terms
      .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "g",
  );

  return (
    <>
      {text.split(pattern).map((part, i) =>
        emphasis.includes(part) ? (
          <strong key={i} className="font-medium text-ink">
            {part}
          </strong>
        ) : signal.includes(part) ? (
          <strong key={i} className="font-medium text-signal">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** About body. Rendered by /about, which owns the page chrome. */
export function About() {
  return (
    <section aria-labelledby="about-body-heading">
      <h2 id="about-body-heading" className="sr-only">
        About me
      </h2>

      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <Label className="text-signal">Origin</Label>
          <p className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
            {site.degree},{" "}
            <span className="text-ink-muted">{site.university.split(" (")[0]}.</span>
          </p>
          <p className="label mt-5 flex items-center gap-2">
            <span
              aria-hidden
              className="size-1.5 shrink-0 rounded-full bg-signal"
            />
            <span>
              {site.yearsExperience}+ years · {site.role} · {site.availability}
            </span>
          </p>
        </div>

        <div className="max-w-[68ch] space-y-6 text-lg leading-relaxed text-ink-muted">
          {bio.map((p) => (
            <p key={p.text.slice(0, 24)}>
              <Prose text={p.text} emphasis={p.emphasis} signal={p.signal} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}