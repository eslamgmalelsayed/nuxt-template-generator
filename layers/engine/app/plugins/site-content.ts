import { defineNuxtPlugin, useState } from 'nuxt/app'
import type { SiteConfig, ThemeConfig } from '../types/template'

type Content = { site: SiteConfig | null; theme: ThemeConfig | null }

/**
 * Loads live content from the DB once during SSR and hands it to the client via
 * the Nuxt payload, so every component reads it synchronously through
 * useSiteConfig() → useState('site-content'). No per-component fetching.
 */
export default defineNuxtPlugin(async () => {
  const content = useState<Content | null>('site-content', () => null)
  // On the client this is already populated from the SSR payload — skip refetch.
  if (content.value) return
  content.value = await $fetch<Content>('/api/content')
})
