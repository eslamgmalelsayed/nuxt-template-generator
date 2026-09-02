# Strata — Nuxt Business Template Engine

A config-driven engine for building **many distinct, SEO-first business websites** from one reusable
core. The engine is a **Nuxt Layer** (`@strata/engine`); each site is a thin app that `extends` it and
supplies only its **content + theme**. New site = new config + theme, **no component edits**.

> Repo: `nuxt-template-generator` · First site built on it: **Rolaco** (Arabian Shutoh & Lights).

## Highlights

- **Nuxt 4 + Static SSG** — prerendered HTML for real SEO
- **Bilingual AR / EN** with full **RTL**, per-site default locale
- **Dark / light** theming via swappable CSS-variable presets
- **WCAG 2.1 AA** accessibility baked in
- **`@nuxtjs/seo`** — sitemap, robots, OG images, schema.org, hreflang
- **Animated SVG hero** (electric skyline) with reduced-motion + optional 3D slot
- **Lighthouse quality gate** in CI (Performance / SEO / A11y / Best-Practices)

## Structure

```
packages/engine/     @strata/engine — the reusable Nuxt Layer
                     (components, composables, types, css, i18n, modules)
apps/rolaco/         first real site — Arabic-default, blue theme
apps/starter/        blank neutral base — English-default, green theme
.github/workflows/   Lighthouse quality gate (both apps)
```

Each app provides content + theme through `app/app.config.ts` (`{ site, theme }`), read by the engine.

## Getting started

Uses **pnpm** workspaces.

```bash
pnpm install
pnpm dev:rolaco        # dev server for the Rolaco app
pnpm gen:rolaco        # static build → apps/rolaco/.output/public
pnpm dev:starter       # the blank starter
```

## Add a new business site

1. Copy `apps/starter` → `apps/<name>`
2. Edit `app/site/{config,theme}.ts` (content + palette) and `app/app.config.ts`
3. `pnpm --filter <name> dev`

No engine/component changes required.

## Quality gate

Lighthouse runs in CI (`.github/workflows/quality.yml`) on push/PR for every app, and fails if
Accessibility or SEO drop below 0.95. Run locally on demand:

```bash
pnpm audit:rolaco      # build + Lighthouse for one app
```
