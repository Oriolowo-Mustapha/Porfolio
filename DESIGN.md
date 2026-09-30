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

## Layout

Max measure `68ch` for prose, `1200px` page. Sections separated by `1px` rules,
not gaps alone. Project index is a **list**, not a card grid — each row is a
numbered folio entry with a hairline, thumbnail on hover at ≥1024px.
