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

**Two presentations of one pill, never both at once.** `nav` in
`src/lib/site.ts` is the single source; each viewport gets the presentation that
fits it. Both presentations come from the same component,
`src/components/ui/bottom-nav-bar.tsx`, so they cannot drift apart.

| Viewport | Surface | Item |
|---|---|---|
| below `md` (768px) | fixed pill, bottom centre | 44×44 icon well; the active one expands to show its label |
| `md` and up | same pill, expanded, centred in the sticky header | icon + text label on every item |

The two are switched by `hidden md:block` on the header pill and `md:hidden` on
its bottom wrapper. That is a `display: none` removal, so at any width exactly
one `aria-label="Primary"` landmark exists. Two landmarks carrying the same six
links at once would be a duplicate-navigation failure, so the DOM holds both and
the accessibility tree holds one. Verified at 390 / 430 / 767 / 768 / 834 /
1024 / 1440.

The desktop pill is centred by `grid-cols-[1fr_auto_1fr]` on the header row, not
by a fixed-width spacer opposite the wordmark. A spacer has to hard-code the
wordmark's measured width, and that drifts by a few pixels when the font or the
letter-spacing changes. Equal side tracks centre it by construction.

**Why `md` and not `sm`.** The expanded pill is 602px. At 768 it lands centred in
a 720px content box with both gutters intact, and every item clears 87px. Below
that there is no width to spend on an expanded row, so the collapsed pill owns
the viewport — which is also where a thumb can reach it.

- Résumé is a file, not a route, so it never reads as the current page and
  carries no `aria-current`. It sits inside whichever pill is live.
- Résumé **opens in the browser**, it does not download. The `download`
  attribute is gone from all three links (header pill, bottom pill, hero). The
  PDF is served as `application/pdf` with no `Content-Disposition: attachment`,
  so the browser's own viewer takes it and the visitor can read and search it.
  A plain `<a>` is used rather than `<Link>`, because client-side routing to a
  file tries to render the response as a page.
- The hero link's icon is `ArrowUpRight`, not a download glyph. The icon has to
  agree with what the link does.
- `body` carries `pb-28 md:pb-0`. The bottom pill is 68px tall and sits 16px off
  the viewport floor, and only exists below `md`, so above that it is owed
  nothing.
- Tap targets are 44×44 in both presentations — the desktop row is the same
  component, so it does not get a smaller target just because a pointer is
  driving it.

### Routes

`nav` in `src/lib/site.ts` holds real routes, so the active state is the
pathname (`aria-current="page"`) in both surfaces and there is nothing to
observe. There is deliberately no `useState` index in the component: these are
links to routes, so local state would light up the wrong item after any
back/forward navigation or a direct URL load.

| Route | Contents |
|---|---|
| `/` | Hero with rotating role titles, the role timeline, and the three headline projects |
| `/about` | Biography, education, current focus |
| `/roles` | The role timeline |
| `/skills` | The stack, grouped by the part of the system it serves |
| `/say-hello` | Contact channels and the message form |
| `/projects`, `/projects/[slug]` | Full index and per-project briefs |

Every sub-route opens through `PageHero`: a folio numeral, a small caps
eyebrow, the display-serif title, a hairline, and a standfirst. Moving between
pages should feel like turning a leaf.

### Label reveal

The collapsed pill reveals one label at a time. Mobile animates the active
label's width between `0px` and a fixed 72px — never `"auto"`, which raced the
collapse and left labels intermittently stuck at zero. 72px holds the longest
label ("Say hello" → "Résumé") at 13px, and nothing else is ever shown there, so
it can be a constant instead of a measurement pass.

The expanded pill does **not** animate label width at all. The set of labels
never changes between items, so there is nothing to animate, and static auto
width means no label can be clipped by a fixed pixel guess.

Only the label widths are JavaScript. The pill's entrance is CSS
(`@starting-style` on `.pill-enter`, alongside `.reveal`) because a JS-driven
`initial` painted `opacity: 0` into the SSR HTML and then failed to match for
anyone whose OS has reduced motion enabled — `useReducedMotion` reports false on
the server and true on the client. The pill is present on every route, so that
mismatch was on every page.

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
