// A site built on the local Strata engine (layers/engine).
// To make a new client site: use this repo as a GitHub template, then edit
// app/site/{config,theme}.ts (and app/app.config.ts). No engine changes needed.
export default defineNuxtConfig({
  extends: ['./layers/engine'],

  site: {
    url: 'https://example.com',
    name: 'Acme Studio',
    description: 'A site built with Strata.',
    defaultLocale: 'en',
  },

  nitro: {
    prerender: { routes: ['/', '/ar'] },
  },
})
