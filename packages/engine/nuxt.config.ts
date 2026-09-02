import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

/**
 * @strata/engine — the reusable Nuxt Layer.
 * Apps `extends: ['@strata/engine']` and provide their content via app.config.ts.
 * Layer-local file paths are absolute (import.meta.url) because a layer's `~`
 * alias resolves to the CONSUMER app, not the layer.
 */
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo', '@nuxtjs/i18n', '@nuxtjs/color-mode', '@vueuse/nuxt', '@nuxt/fonts'],

  css: [fileURLToPath(new URL('./app/assets/css/main.css', import.meta.url))],

  vite: {
    plugins: [tailwindcss()],
  },

  // Static generation is the engine default; apps can add their own prerender routes.
  nitro: {
    prerender: { crawlLinks: true },
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
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
      { name: 'IBM Plex Sans Arabic', provider: 'google' },
    ],
  },
})
