import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

/**
 * @strata/engine — the reusable Nuxt Layer.
 * Apps `extends: ['@strata/engine']` and provide their content via app.config.ts.
 * Layer-local file paths are absolute (import.meta.url) because a layer's `~`
 * alias resolves to the CONSUMER app, not the layer.
 */
export default defineNuxtConfig({
  // Stable specifier for consumers to import the engine's public types, e.g.
  // `import type { SiteConfig } from '#engine/types'`. Resolves to the layer
  // root whether the engine is a local layer or fetched from git — so client
  // apps that drop the vendored copy keep working.
  alias: {
    '#engine': fileURLToPath(new URL('./', import.meta.url)),
  },

  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    'nuxt-auth-utils',
    '@vite-pwa/nuxt',
  ],

  // Installable dashboard (install from /admin). The service worker precaches
  // only immutable hashed client assets and has NO navigation fallback, so the
  // public SSR site + content API are always served fresh from the network.
  pwa: {
    registerType: 'autoUpdate',
    strategies: 'generateSW',
    // We wire the manifest link + SW registration explicitly (engine plugin +
    // admin layout) since the module's auto-injection doesn't fire from a layer.
    injectRegister: false,
    manifest: {
      name: 'Site Dashboard',
      short_name: 'Dashboard',
      description: 'Manage your site content and theme.',
      start_url: '/admin',
      scope: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#0f9d70',
      icons: [
        { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    workbox: {
      navigateFallback: undefined,
      globPatterns: ['**/*.{js,css}'],
    },
    client: { installPrompt: true },
    devOptions: { enabled: false },
  },

  css: [fileURLToPath(new URL('./app/assets/css/main.css', import.meta.url))],

  vite: {
    plugins: [tailwindcss()],
  },

  // The app is SSR (content is served from the DB at request time). Native
  // node modules (better-sqlite3) must stay external, not bundled by Rollup.
  nitro: {
    externals: { external: ['better-sqlite3'] },
  },

  runtimeConfig: {
    // Path to the SQLite file; override in prod with NUXT_DATABASE_PATH.
    databasePath: './data/app.db',
    // Where uploaded images are written + served from (a mounted volume in prod;
    // override with NUXT_UPLOADS_DIR). NOT the baked public/ dir, which is
    // read-only at runtime.
    uploadsDir: './data/uploads',
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'strata-color-mode',
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en', // apps override (e.g. Rolaco → 'ar')
    langDir: 'locales',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', language: 'en-US', dir: 'ltr', name: 'English', file: 'en.json' },
      { code: 'ar', language: 'ar-SA', dir: 'rtl', name: 'العربية', file: 'ar.json' },
    ],
  },

  fonts: {
    families: [
      { name: 'Space Grotesk', provider: 'google' },
      { name: 'Inter', provider: 'google' },
      { name: 'Cairo', provider: 'google' },
    ],
  },
})
