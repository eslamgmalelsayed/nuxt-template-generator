// Starter — blank neutral site on the @strata/engine layer (English default).
export default defineNuxtConfig({
  extends: ['@strata/engine'],

  site: {
    url: 'https://starter.example.com',
    name: 'Acme Studio',
    description: 'A blank Strata starter template.',
    defaultLocale: 'en',
  },

  nitro: {
    prerender: { routes: ['/', '/ar'] },
  },
})
