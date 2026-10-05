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
  **Self-hosted**, not `next/font/google`: see the note below.

`.label` = mono, 11px, `0.14em` tracking, uppercase, ink-faint.

**JetBrains Mono is self-hosted; the other two are not.** The mono was on
`next/font/google`, which re-fetched `fonts.googleapis.com` on every dev request
and logged a `Failed to download` warning each time it timed out, silently
falling back to a system mono — so labels looked different on a slow network
than they do in production. It now loads through `next/font/local` from
`@fontsource-variable/jetbrains-mono`, whose variable build covers the whole
weight axis in one 40KB woff2. Nothing is fetched at build or request time: dev
logs no font traffic at all, and a cold or offline build still works. Inter and
Instrument Serif stay on `next/font/google` because they resolve reliably and
are cached after the first build; if either starts retrying, move it the same
way.

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
- Saturated third-party brand colour. The marks are monochrome and take
  `currentColor`, so they sit at `ink-muted` beside the name. A wall of React
  blue, Python yellow and Mongo red would have been the only saturated thing on
  a paper-coloured page, competing with `--signal` for the one accent here.
- Body copy in ink-faint · any text under 11px

## Navigation

**Two presentations of one pill, never both at once.** `nav` in
`src/lib/site.ts` is the single source; each viewport gets the presentation that
fits it. Both presentations come from the same component,
`src/components/ui/bottom-nav-bar.tsx`, so they cannot drift apart.

| Viewport | Surface | Item |
|---|---|---|
| below `md` (768px) | fixed pill, bottom centre | 44×44 icon well, icon only |
| `md` and up | same pill, labelled, centred in the sticky header | icon + text label on every item |

The two are switched by `hidden md:block` on the header pill and `md:hidden` on
its bottom wrapper. That is a `display: none` removal, so at any width exactly
one `aria-label="Primary"` landmark exists. Two landmarks carrying the same five
links at once would be a duplicate-navigation failure, so the DOM holds both and
the accessibility tree holds one. Verified at 390 / 430 / 767 / 768 / 834 /
1024 / 1440.

The desktop pill is centred by `grid-cols-[1fr_auto_1fr]` on the header row, not
by a fixed-width spacer opposite the wordmark. A spacer has to hard-code the
wordmark's measured width, and that drifts by a few pixels when the font or the
letter-spacing changes. Equal side tracks centre it by construction.

**The header row is full-bleed, not in the content column.** It was
`mx-auto max-w-[1200px]`, which put the wordmark 385px in from the viewport edge
on a 1920px screen — a wide dead gutter to its left that read as a mistake. The
row now spans the viewport, the wordmark is pinned left at the page gutter
(`px-5 sm:px-8`), and the pill centres on the *viewport* rather than on the
content column. The two are independent objects on the same line instead of
items sharing a column. Below `md` this changes nothing measurable, because
`max-w` never constrained the row anyway.

**The header has no hairline.** The `border-b` that appeared on scroll was
removed: with the wordmark at the far edge and the pill centred, a rule running
the full width between them read as one container housing both. Separation now
comes from the sticky `bg-paper/85 backdrop-blur-md` alone, which is enough to
stop content showing through behind the wordmark while scrolling.

### Dock colour

The pill's hairline and shadow are tinted with the ochre `--signal` family, not
neutral grey:

| Token | Was | Now |
|---|---|---|
| `--dock-border` | `oklch(0.91 0.006 80)` neutral | `oklch(0.885 0.028 50)` warm |
| `--dock-active` | `oklch(0.928 0.004 80)` neutral | `oklch(0.855 0.055 50)` warm |
| `--dock-shadow` | ink at 4/6/5% | ochre at 5/7/5% |

A grey-bordered control on warm paper reads as borrowed chrome from another
product. Carrying the brown through the hairline, the active fill and the shadow
makes the pill part of this palette.

### Active state, and what actually carries it

Measured with canvas-sampled sRGB (not by reading `getComputedStyle`, which
returns `lab()` and will silently give nonsense if parsed as RGB):

| Pair | Ratio |
|---|---|
| `--ink` vs `--ink-muted` | 2.78:1 |
| `--dock-active` vs `--dock` | 1.56:1 |
| `--dock-border` vs `--dock` | 1.42:1 |

The mobile pill shows icons only, so none of the three is a sufficient cue by
itself — **1.56:1 does not clear the 3:1 that WCAG 1.4.11 asks of a boundary
needed to identify a control.** This is a known, accepted compromise, recorded
here rather than hidden:

- Active state is exposed programmatically by `aria-current="page"`, so it is
  never lost for assistive tech.
- The three signals stack: `aria-current`, the icon's tonal step, and the fill.
- In practice you are looking at a 44×44 target, not a 1px hairline, so the
  tonal step reads well above what the raw ratio suggests.

**If this ever needs to clear 3:1**, deepen `--dock-active` to roughly
`oklch(0.72 0.09 48)` and re-measure — but that turns the chip into a
noticeably heavy tan blob, which is why it has not been done. The genuinely
load-bearing boundary is the focus ring, which uses `--rule-strong` and does
clear 3:1.

> An earlier version of this file claimed `--dock-active` sat at 1.05:1 and that
> `--rule-strong` marked the active nav item. Both were wrong: the 1.05 figure
> came from misparsing `lab()` output as RGB, and the active item uses
> `--dock-active`, not `--rule-strong`.

**Why `md` and not `sm`.** The labelled pill is 513px. At 768 it lands centred in
a 720px content box with both gutters intact, and every item clears 87px. Below
that there is no width to spend on a labelled row, so the icon-only pill owns
the viewport — which is also where a thumb can reach it. The icon-only pill is
242px, so the breakpoint is about label legibility and thumb reach, not about
the pill fitting: the icons would fit at any width.

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
- `body` carries `pb-28 md:pb-0`. The bottom pill is 58px tall and sits 16px off
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
| `/` | Hero with rotating role titles, circular portrait, the role timeline, and the three headline projects |
| `/about` | Biography, then the ten-group technical-skills taxonomy |
| `/roles` | The role timeline, then the full project index |
| `/say-hello` | Contact channels and the message form |
| `/projects`, `/projects/[slug]` | Full index and per-project briefs |

**Why the stack sits under the biography and not the roles.** These are the
tools this person works with, which is a fact about them, not about a job they
happened to hold. `/roles` holds the timeline and the work that came out of it.

`ProjectIndex` and `ProjectList` are the same rows with different framing: the
first is a home-page band with a folio numeral and its own container, the second
is a bare `label` heading plus the list for a page already inside a `PageHero`.
Only the framing differs, so the row markup lives in one place. Nesting the band
inside `/roles` would have doubled the gutters and pulled a "05" numeral from a
different sequence into a page numbered 01.

`/roles` lists all seven projects and shows no "all projects" link — there is
nothing left to link to. Home still shows three and links to `/projects`.

`/skills` used to hold the stack on its own. It was folded into `/roles` when
the roles page was the only place the stack lived, and has since moved again to
`/about`. The route is gone, but `next.config.ts` keeps a permanent `/skills` →
`/roles` redirect so inbound links and anything already indexed still land
somewhere, and the old URL is out of `sitemap.xml`.

Every sub-route opens through `PageHero`: a folio numeral, a small caps
eyebrow, the display-serif title, a hairline, and a standfirst. Moving between
pages should feel like turning a leaf.

### Technical-skills presentation

The About inventory is a capability-first taxonomy: ten groups and 42 supplied
bullets covering standalone products, versions, architecture patterns,
providers, and operational practices. A brand mark cannot honestly represent
every row, so the section uses prose with one restrained ochre marker per line
instead of forcing logos onto patterns and providers.

`src/components/brand-icon.tsx` and `scripts/generate-brand-icons.mjs` remain in
the repository but are not imported by the current stack. They are retained as a
source of authentic marks if a future presentation returns to one logo per
standalone technology.

### Labels: where they live, and where they don't

The pill has two presentations, and the only difference between them is whether
the label is rendered:

| Viewport | Pill | Labels |
|---|---|---|
| below `md` | fixed, bottom centre, 242×58 | none — icons only |
| `md` and up | in the header, centred, 513×58 | every item |

On mobile the labels used to spring open on the active item. That is gone, and
with it the last of the JavaScript in the component: the `motion.span`, the
72px `MOBILE_LABEL_WIDTH` constant, the `useReducedMotion` call and the `reduce`
prop threaded through three components. Both presentations are now static —
either a label is there or it is not — so there is nothing left to animate, and
the hydration risk that came with it went away as a side effect.

**The label moves, it does not disappear.** With `variant="icons"` the word is
not rendered, so each link carries `aria-label={label}` plus a `title` for the
hover tooltip the visible text used to give for free. `title` never wins over
`aria-label` as the accessible name, so the two cannot conflict. The word is
never in the DOM twice, so a screen reader announces "Home, link" rather than
"Home Home".

Only the pill's *entrance* is still CSS — `@starting-style` on `.pill-enter`,
alongside `.reveal`. A JS-driven `initial` painted `opacity: 0` into the SSR HTML
and then failed to match for anyone whose OS has reduced motion enabled, because
`useReducedMotion` reports false on the server and true on the client. The pill
is on every route, so that mismatch was on every page.

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
