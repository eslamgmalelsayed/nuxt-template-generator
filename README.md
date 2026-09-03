# Nuxt Template Generator — Business Site Starter

A production-ready **Nuxt 4 starter** for building fast, SEO-first, bilingual business sites.
Use it as a **GitHub template** to spin up a fresh, self-contained project per client — edit config,
deploy static, done. The reusable **engine** lives inside as a local Nuxt layer (`layers/engine`), so
each copy is fully independent (no external package, nothing to maintain centrally).

## Features

- **Nuxt 4 + Static SSG** — prerendered HTML for real SEO
- **Bilingual AR / EN** with full **RTL** (per-site default locale)
- **Dark / light** theming (light default) + animated toggle (View Transitions)
- **WCAG 2.1 AA** accessibility baseline
- **SEO stack** (`@nuxtjs/seo`) — sitemap, robots, OG images, schema.org, hreflang
- **Section variants** + **rich token presets** (shape / density / type scale) — re-skin without touching components
- **Accessible forms** (Valibot) · **scroll-to-top** · **Cairo** Arabic font
- **Lighthouse quality gate** in CI (perf floored at 0.85; a11y/SEO must be ≥0.95)

## Create a new client site

1. **Use this template** on GitHub → new repo.
2. `pnpm install`
3. Edit **`app/site/config.ts`** (content, per-locale) and **`app/site/theme.ts`** (palette, shape/density/type).
4. Set your domain in `nuxt.config.ts` (`site.url`) and the default locale.
5. `pnpm generate` → deploy `.output/public` to any static host (Netlify / Vercel / Cloudflare Pages).

## Structure

```
app/
  app.config.ts        # points the engine at this site's config + theme
  site/{config,theme}.ts   # THE stuff you edit per project
layers/engine/         # the reusable engine (Nuxt layer) — you rarely touch this
  app/                 # components, composables, sections + variants, tokens, layout
  i18n/locales/        # UI-chrome strings
  types.ts             # SiteConfig / ThemeConfig / Section contracts
```

## Scripts

| Command                     | What                               |
| --------------------------- | ---------------------------------- |
| `pnpm dev`                  | Dev server (http://localhost:3000) |
| `pnpm generate`             | Static build → `.output/public`    |
| `pnpm preview`              | Preview the production build       |
| `pnpm lint` / `pnpm format` | ESLint / Prettier                  |
| `pnpm test:quality`         | Build + Lighthouse gate            |

## Add a section variant / new section

Variants live in `layers/engine/app/components/sections/` and are registered in `SectionRenderer.vue`
(`kind → variant → component`). Pick one per section in `app/site/config.ts` via `variant`.
