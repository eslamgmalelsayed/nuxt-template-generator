// Rolaco — a site built on the @strata/engine layer.
export default defineNuxtConfig({
  extends: ['@strata/engine'],

  site: {
    url: 'https://rolaco.example.com',
    name: 'Rolaco — Arabian Shutoh & Lights',
    description:
      'Rolaco — Arabian Shutoh & Lights. Powering Saudi Arabia for 50+ years with electric power and lighting solutions.',
    defaultLocale: 'ar',
  },

  // Arabic is Rolaco's default locale (overrides the engine default 'en').
  i18n: {
    defaultLocale: 'ar',
  },

  nitro: {
    prerender: { routes: ['/', '/en'] },
  },
})
