# AGENTS.md

Context for AI agents working on this repo.

## What this is
Personal consulting site for **Ofir Shtrull** (DevOps & platform engineering), under the **FTC-Cloud** brand. Goal: convert qualified visitors into intro calls. Voice is first-person ("I"), senior, plain-spoken — never agency "we", never hype adjectives.

Strategy + visual system live in **`PRODUCT.md`** (who/what/why) and **`DESIGN.md`** (colors, type, components). Read both before design work.

## Stack & build
- **Static site. No build step, no framework, no package manager.** Plain HTML + one CSS file + one JS file.
- Pages: `index.html` (single-page sections: hero, services, process, about, technologies, contact), `privacy-policy.html`, `terms-of-service.html`.
- `css/styles.css` — all styles, OKLCH tokens, dark (default) + light themes.
- `scripts/script.js` — theme toggle, mobile menu, scroll reveals, contact form, scroll-to-top.
- Assets in `assests/` (note the spelling — keep it).

## Deploy
GitHub Pages, auto-deploys on **push to `main`** (`.github/workflows/static.yml`). Pushing to main ships to production.

## Conventions & gotchas
- **Cache-bust on every CSS/JS change.** Bump the `?v=N` query on the `styles.css` / `script.js` links in all three HTML files together (currently `v=7`). Stale CSS in browsers is otherwise a real problem.
- **Scope global element selectors.** Header is `<header role="banner">` and section/footer headings are also `<header>`/`<nav>`. Bare `header {}` / `nav ul {}` rules leak and break section heads/footer — always scope to `header[role="banner"]`. (Bit us twice.)
- **Icons are inline SVG, theme-aware.** Service-card icons, the logo mark, and nav icons use `currentColor` / `var(--accent)` so they adapt dark↔light. No raster image icons — don't reintroduce PNG icons. Favicon: `assests/favicon/mark.svg` (+ PNG fallbacks).
- **Theme:** dark is the default; set pre-paint via inline `<head>` script to avoid flash; user choice persisted in `localStorage`. Light theme must stay coherent.
- **Reveal motion is enhancement-only.** Content ships visible; JS adds entrance animation. Never gate visibility on a class transition (blanks in headless/background tabs). Respect `prefers-reduced-motion`.
- **Accessibility:** WCAG AA. Body text ≥4.5:1, visible focus rings, keyboard-navigable. Verify contrast in both themes after color changes.

## Known follow-ups
- Contact form is front-end only (simulated send) — needs a backend/Formspree to actually deliver.
- `og:image` + schema `logo` still point to the old `assests/logos/logo.png`; needs a real ~1200×630 raster regenerate.
- Orphaned raster assets (old `*-icon*.png`, `logo3.png`, `cloud-background.jpg`) are unreferenced; safe to delete.
