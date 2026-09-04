// Dashboard dev-harness for the headless engine (layers/engine).
// This repo is NOT a marketing site — it only provides content + schemas via
// app.config so you can run and preview the /admin dashboard against the engine.
// Client sites (their own front-end) live in separate repos and consume the
// published package. `/` redirects to the dashboard.
export default defineNuxtConfig({
  extends: ['./layers/engine'],

  site: {
    url: 'https://example.com',
    name: 'Site Engine',
    description: 'Headless engine dashboard harness.',
    defaultLocale: 'en',
  },

  routeRules: {
    '/': { redirect: '/admin' },
  },
})
