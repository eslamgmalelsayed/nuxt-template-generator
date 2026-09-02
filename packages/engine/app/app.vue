<script setup lang="ts">
import { computed } from 'vue'
import { useSiteConfig } from './composables/useSiteConfig'
import type {
  ThemePalette,
  ThemeConfig,
  ShapePreset,
  DensityPreset,
  TypeScalePreset,
} from './types/template'

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
    `--accent-strong:${p.accentStrong}`,
    `--glow:${p.glow}`,
  ].join(';')
}

// --- rich token presets: shape / density / typeScale → CSS vars ---
const shapeMap: Record<ShapePreset, Record<string, string>> = {
  sharp: { sm: '0.125rem', md: '0.25rem', lg: '0.375rem', xl: '0.5rem', btn: '0.375rem' },
  soft: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.25rem', btn: '9999px' },
  pill: { sm: '0.75rem', md: '1.1rem', lg: '1.5rem', xl: '1.75rem', btn: '9999px' },
}
const densityMap: Record<DensityPreset, { y: string; tight: string }> = {
  compact: { y: 'clamp(3rem, 2.2rem + 4vw, 5rem)', tight: 'clamp(2.25rem, 1.8rem + 2vw, 3.25rem)' },
  default: { y: 'clamp(4rem, 3rem + 6vw, 7rem)', tight: 'clamp(3rem, 2.4rem + 3vw, 4.5rem)' },
  airy: { y: 'clamp(5rem, 3.5rem + 8vw, 9rem)', tight: 'clamp(3.5rem, 2.8rem + 4vw, 5.5rem)' },
}
const typeMap: Record<TypeScalePreset, string> = {
  compact: '0.92',
  default: '1',
  spacious: '1.08',
}

function settingsVars(t: ThemeConfig) {
  const shape = shapeMap[t.shape ?? 'soft']
  const density = densityMap[t.density ?? 'default']
  const mult = typeMap[t.typeScale ?? 'default']
  return [
    `--radius-sm:${shape.sm}`,
    `--radius-md:${shape.md}`,
    `--radius-lg:${shape.lg}`,
    `--radius-xl:${shape.xl}`,
    `--radius-btn:${shape.btn}`,
    `--section-y:${density.y}`,
    `--section-y-tight:${density.tight}`,
    `--type-mult:${mult}`,
  ].join(';')
}

const themeCss = computed(
  () =>
    `:root{${paletteVars(theme.light)};${settingsVars(theme)}}\n.dark{${paletteVars(theme.dark)}}`,
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
