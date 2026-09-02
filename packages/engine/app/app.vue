<script setup lang="ts">
import { computed } from 'vue'
import { useSiteConfig } from './composables/useSiteConfig'
import type { ThemePalette } from './types/template'

// i18n-driven <html lang> and dir (rtl for Arabic)
const head = useLocaleHead()
const { theme } = useSiteConfig()

// Inject the active preset's palette as CSS variables so a different template
// re-skins the whole site with no component changes (SSG-safe, no FOUC).
function paletteVars(p: ThemePalette) {
  return [
    `--bg:${p.bg}`,
    `--surface:${p.surface}`,
    `--surface-2:${p.surface2}`,
    `--surface-3:${p.surface3}`,
    `--border:${p.border}`,
    `--text:${p.text}`,
    `--text-muted:${p.textMuted}`,
    `--accent:${p.accent}`,
    `--glow:${p.glow}`,
  ].join(';')
}

const themeCss = computed(
  () => `:root{${paletteVars(theme.light)}}\n.dark{${paletteVars(theme.dark)}}`,
)

useHead({
  htmlAttrs: computed(() => head.value.htmlAttrs ?? {}),
  // include i18n's hreflang alternates (link) and og:locale (meta)
  link: computed(() => head.value.link ?? []),
  meta: computed(() => head.value.meta ?? []),
  style: [{ id: 'template-theme', innerHTML: themeCss }],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
