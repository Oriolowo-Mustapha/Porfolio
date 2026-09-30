# DESIGN.md — Paper

Mode: **Experience** (portfolio). The artifact leads; the interface recedes.

## The world

A sheet of warm off-white paper on a table. Type is set, not laid out. Structure
comes from hairline rules and generous margins, never from shadows, borders-as-boxes,
or cards floating on a tinted background. The only saturated color is a burnt ochre
used sparingly for signal — a link, a folio number, a hover.

This is a **replacement** of the previous dark-slate dashboard aesthetic, not a
refinement of it. The old bento grid, fullscreen overlay, and glass icons are gone.

## Tokens

| Role | Value | Note |
|---|---|---|
| Paper | `oklch(0.968 0.005 85)` | warm off-white, never `#fff` |
| Paper raised | `oklch(0.985 0.004 85)` | inputs, popovers |
| Ink | `oklch(0.205 0.008 70)` | warmed off pure black |
| Ink muted | `oklch(0.485 0.008 70)` | body copy, ≥7:1 on paper |
| Ink faint | `oklch(0.62 0.008 70)` | labels only, never body |
| Rule | `oklch(0.885 0.008 80)` | hairlines |
| Rule strong | `oklch(0.78 0.01 75)` | input borders |
| Signal | `oklch(0.47 0.13 45)` | burnt ochre — links, folio, hover |

Radius: **2–4px**. Paper has no rounded corners. Shadows: **none**.
Spacing scale: 4 / 8 / 12 / 16 / 24 / 32.
Grain: `feTurbulence` SVG, 2.8% opacity, `position: fixed` — the texture belongs to
the viewport, not the content.

## Type

- **Display** — Instrument Serif. Section titles, project titles, the name.
  Tracking `-0.015em`, leading `0.98`.
- **Body** — Inter. Prose, descriptions.
- **Mono** — JetBrains Mono. Labels, dates, folio numbers, tech stacks.

`.label` = mono, 11px, `0.14em` tracking, uppercase, ink-faint.

## Motion

- UI animations **< 300ms**. Enter: `--ease-out-expo`. Never `ease-in`.
- Entrance via `@starting-style` + `clip-path` — CSS, off the main thread, no
  `useEffect`+mounted, no hydration flash.
- Press: `scale(0.97)`, 160ms.
- Hover gated behind `@media (hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion` drops all transform and clip motion, keeps opacity.

## Anti-patterns — banned

- Purple gradients (`#8B5CF6` from the paper style spec is **rejected**: it is the
  default AI-UI accent, and the previous site already leaned on it)
- Shadows on cards · glassmorphism · bento card grids
- Rounded corners beyond 4px
- `transition: all` · animations over 300ms · `scale(0)` entrances
- Font Awesome / Devicon CDN `<i>` elements (replaced by `lucide-react`)
- Body copy in ink-faint · any text under 11px

## Navigation

**Two presentations, one set of links, never both at once.** `nav` in
`src/lib/site.ts` is the single source; each viewport gets the presentation that
fits it.

| Viewport | Surface | Item |
|---|---|---|
| below `lg` (1024px) | `NavDock` — fixed pill, bottom centre | 44×44 icon well; the active one expands to show its label |
| `lg` and up | `SiteHeader` — inline list in the sticky header | text label, ochre underline on the active item |

The two are switched by `hidden lg:block` on the header nav and `lg:hidden` on
the dock. That is a `display: none` removal, so at any width exactly one
`aria-label="Primary"` landmark exists. Two landmarks carrying the same five
links at once would be a duplicate-navigation failure, so the DOM holds both
and the accessibility tree holds one. Verified at 390 / 768 / 1024 / 1440.

**Why `lg` and not `sm`.** The header has to fit a wordmark, five text labels
and a bordered Résumé button without wrapping or clipping. Measured at 1024:
nav is 445px in a 1009px container, landing exactly on the inner limit with the
32px gutter intact. Below 1024 there is not room for that, so the dock carries
the viewport instead — which is also where a thumb can reach it.

- Résumé is a download, not a route, so it never reads as the current page. It
  sits inside whichever surface is live: in the dock's pill below `lg`, in the
  header list with a leading hairline divider at `lg` and up. Never both.
- The header underline is a hairline, not a filled pill. That row sits on a
  ruled header; a fill would fight the rule.
- `body` carries `pb-24 lg:pb-0`. The dock is 70px tall and only exists below
  `lg`, so above that its height is owed nothing.
- Dock labels collapse with `grid-template-columns: 0fr → 1fr`, never an
  animated width — see [Label reveal](#label-reveal).
- Tap targets in the dock are 44×44. Header items are 32px tall, which is the
  size inline text navigation is meant to be; the 44px rule is a touch-target
  rule and does not apply to a pointer-driven row.

### Routes

`nav` in `src/lib/site.ts` holds real routes, so the active state is the
pathname (`aria-current="page"`) in both surfaces and there is nothing to
observe.

| Route | Contents |
|---|---|
| `/` | Hero with rotating role titles, and the three headline projects |
| `/about` | Biography, education, current focus |
| `/roles` | The role timeline |
| `/skills` | The stack, grouped by the part of the system it serves |
| `/say-hello` | Contact channels and the message form |
| `/projects`, `/projects/[slug]` | Full index and per-project briefs |

Every sub-route opens through `PageHero`: a folio numeral, a small caps
eyebrow, the display-serif title, a hairline, and a standfirst. Moving between
pages should feel like turning a leaf.

### Label reveal

Dock labels collapse with `grid-template-columns: 0fr → 1fr`, not an animated
width. It needs no measurement pass and no inline width style, so no second rule
can contradict it, and being a plain CSS transition it runs off the main thread.
An earlier animated-width version had to be driven against measured pixel values
because animating to `"auto"` raced the collapse and left labels intermittently
stuck at zero.

`0fr` resolves to `minmax(0, 0fr)`, which is what permits the collapse; `1fr`
would be `minmax(auto, 1fr)` and refuse. The inner span needs `overflow-hidden`
for the same reason — it caps the min-content contribution so the track can
reach zero. No `aria-hidden`: collapsing is purely visual, and the link must
stay named at every viewport.

### Role rotator

The hero cycles four role titles on a 2.8s interval. The full list is also
rendered once for assistive tech with the animated copy `aria-hidden`, so
assistive tech is not handed a different job title on every cycle. Under
`prefers-reduced-motion` nothing rotates and all four are listed. The timer
skips ticks while the tab is hidden.

### Scrolling

There is none, and that is a decision rather than an omission. Native smooth
scrolling was verified failing silently — `scrollTo` reported no movement at all
while the same call with `behavior: "instant"` worked — so it was replaced with a
rAF tween in `src/lib/scroll.ts`. Once navigation became route-based, the last
in-page anchor disappeared and the tween had no consumer. A 140-line module with
zero importers is a trap for the next person, so it was deleted rather than kept
warm. `scroll-padding-top: 5rem` stays to clear the sticky header for the skip
link.

Had in-page anchors returned, the tween was the right answer and worth restoring.
Reach for it before reaching for `scroll-behavior`.

## Layout

Max measure `68ch` for prose, `1200px` page. Sections separated by `1px` rules,
not gaps alone. Project index is a **list**, not a card grid — each row is a
numbered folio entry with a hairline, thumbnail on hover at ≥1024px.
