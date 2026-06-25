# Design

## Theme
Engineering-credible dark. Deep cool-slate near-black canvas, one electric signal-cyan accent, precise typography, restrained infra texture (faint dot grid, accent glow). Dark is the default and the showcase; a coherent light theme ships behind the existing toggle. Mood: a senior platform engineer's console — calm, exact, expensive.

## Color (OKLCH)

### Dark (default)
- bg `oklch(0.16 0.018 248)` · bg-elev `oklch(0.20 0.02 248)` · surface `oklch(0.225 0.022 248)`
- border `oklch(0.32 0.02 248 / 0.55)` · border-strong `oklch(0.42 0.02 248)`
- ink `oklch(0.97 0.004 248)` · ink-soft `oklch(0.86 0.006 248)` · muted `oklch(0.71 0.012 248)`
- accent `oklch(0.82 0.135 200)` · accent-bright `oklch(0.88 0.13 198)` · accent-ink `oklch(0.18 0.03 220)`

### Light
- bg `oklch(0.975 0.004 248)` · surface `oklch(1 0 0)` · border `oklch(0.88 0.008 248)`
- ink `oklch(0.22 0.02 248)` · muted `oklch(0.44 0.018 248)`
- accent `oklch(0.54 0.13 232)` · accent-ink `oklch(0.99 0 0)`

Strategy: **Committed** — accent carries identity (CTAs, labels, focus, hover lines, glow); slate carries the surface. No gradient text.

## Typography
- Display: **Bricolage Grotesque** (700–800), tight tracking, `text-wrap: balance`.
- Body/UI: **Hanken Grotesk** (400–700).
- Mono labels: **JetBrains Mono** (500–600) — used only for the terminal-path section labels (`~/services`), kicker, and stat units. Deliberate system, not decoration.
- Fluid `clamp()` scale, ≥1.25 ratio. Hero display max ~clamp ceiling 5rem.

## Layout
- Max content width 1200px, fluid section padding via `clamp()` for rhythm.
- Hero: dot-grid + radial accent glow, left copy + right terminal panel (the brand's imagery).
- Services: **bento grid** (featured card spans 2 cols) — deliberately not an identical card grid.
- Process: 3 numbered steps (a real sequence — numbering earns its place here only).
- Tech stack: grouped capability chips. Contact: form + direct channels.

## Motion
- CSS hero entrance (staggered, ease-out-quint), above-the-fold visible by default.
- Scroll reveals gated behind a `.js` class so content ships visible if JS/headless; reveal enhances only.
- Hover: accent hairlines, lift, icon transforms. Full `prefers-reduced-motion: reduce` crossfade/instant path.

## Components
Sticky blurred header w/ inline CTA, pill primary + ghost secondary buttons, bordered surfaces with accent-on-hover hairline (no side-stripe borders), tag chips, terminal panel, stat band.
