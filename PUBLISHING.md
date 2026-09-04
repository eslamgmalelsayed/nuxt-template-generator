# Publishing the engine

The engine is a Nuxt layer published as an npm package (`@islamz/site-engine`)
from `layers/engine/`. Clients install it and `extends` it; its dependencies
(better-sqlite3, @nuxtjs/\*, @vite-pwa/nuxt, tailwind…) come with it.

> The scope `@islamz` must match your npm username/org. Change it in
> `layers/engine/package.json` (and in clients) if yours differs.

## Publish

```bash
cd layers/engine
npm login          # once
npm publish --access public
```

Bump `version` in `layers/engine/package.json` for each release, and keep it in
step with the git tag.

## Consuming it (client repo)

```jsonc
// package.json
"dependencies": { "@islamz/site-engine": "^0.2.0" }
```

```ts
// nuxt.config.ts
extends: ['@islamz/site-engine']
```

**Required for pnpm clients** — Nuxt must resolve the modules the engine pulls
in transitively, so the client needs a flat node_modules. In `pnpm-workspace.yaml`:

```yaml
nodeLinker: hoisted
```

(Without it, the engine's `nuxt.config` modules/server silently don't load.)

## Local development (without publishing)

Point the client's `extends` at the local layer instead:

```ts
extends: ['../nuxt-template-generator/layers/engine']
```
