<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useState } from 'nuxt/app'
import { useSiteContent } from '../../composables/useSiteContent'
import { useSchemas } from '../../composables/useSchemas'
import { cleanData, validateFields } from '../../admin/schemaUtils'
import type { SiteConfig, ThemeConfig, ThemePalette } from '../../types/template'

definePageMeta({ layout: 'admin', middleware: 'auth' })
defineI18nRoute(false)

const { t, locale } = useI18n()
const loc = computed(() => locale.value as 'en' | 'ar')
const { theme } = useSiteContent()
const { theme: themeSchema } = useSchemas()

// Generic ThemeConfig preset defaults, used when a theme omits them.
const presetDefaults = { shape: 'soft', density: 'default', typeScale: 'default' } as const

// Editable clone; fill preset defaults so the selects reflect the real theme.
const draft = reactive(JSON.parse(JSON.stringify(theme)) as ThemeConfig)
draft.shape ??= presetDefaults.shape as ThemeConfig['shape']
draft.density ??= presetDefaults.density as ThemeConfig['density']
draft.typeScale ??= presetDefaults.typeScale as ThemeConfig['typeScale']

// Live preview toggles between the light and dark palette being edited.
const previewMode = ref<'light' | 'dark'>('light')
const previewVars = computed(() => {
  const p = draft[previewMode.value] as ThemePalette
  return {
    '--bg': p.bg,
    '--surface': p.surface,
    '--surface-2': p.surface2,
    '--surface-3': p.surface3,
    '--border': p.border,
    '--text': p.text,
    '--text-muted': p.textMuted,
    '--accent': p.accent,
    '--accent-strong': p.accentStrong,
    '--glow': p.glow,
  } as Record<string, string>
})

const content = useState<{ site: SiteConfig | null; theme: ThemeConfig | null } | null>(
  'site-content',
)

const errors = ref<string[]>([])
const saving = ref(false)
const saved = ref(false)

async function save() {
  errors.value = validateFields(themeSchema, draft as unknown as Record<string, unknown>, loc.value)
  saved.value = false
  if (errors.value.length) return

  saving.value = true
  try {
    const clean = cleanData(themeSchema, draft as unknown as Record<string, unknown>)
    const fresh = await $fetch('/api/content', { method: 'PUT', body: { theme: clean } })
    if (content.value) content.value = fresh
    saved.value = true
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string; data?: { errors?: string[] } } }
    errors.value = err?.data?.data?.errors ?? [err?.data?.statusMessage || 'Save failed']
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-8">
    <div class="mb-6 flex items-center justify-between gap-4">
      <h1 class="h3 text-text">{{ t('admin.theme') }}</h1>
      <div class="flex items-center gap-3">
        <span v-if="saved" role="status" class="text-sm" style="color: var(--accent)"
          >✓ {{ t('admin.saved') }}</span
        >
        <button class="btn-primary !min-h-10 !px-6 !py-2" :disabled="saving" @click="save">
          {{ saving ? t('admin.saving') : t('admin.saveTheme') }}
        </button>
      </div>
    </div>

    <div
      v-if="errors.length"
      role="alert"
      class="mb-6 rounded-md border border-[var(--danger)] p-4 text-sm"
      style="color: var(--danger)"
    >
      <p class="mb-1 font-semibold">{{ t('admin.pleaseFix') }}</p>
      <ul class="list-inside list-disc">
        <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
      </ul>
    </div>

    <div class="grid gap-8 md:grid-cols-[1fr_320px]">
      <div class="min-w-0">
        <AdminSchemaForm
          :fields="themeSchema"
          :model="draft as unknown as Record<string, unknown>"
        />
      </div>

      <!-- Live preview -->
      <aside class="md:sticky md:top-20 md:self-start">
        <div class="mb-2 flex items-center gap-2 text-sm">
          <span class="text-muted">{{ t('admin.preview') }}</span>
          <div class="ms-auto inline-flex overflow-hidden rounded-md border border-border">
            <button
              class="px-3 py-1"
              :class="previewMode === 'light' ? 'bg-accent text-white' : 'text-muted'"
              @click="previewMode = 'light'"
            >
              {{ t('admin.light') }}
            </button>
            <button
              class="px-3 py-1"
              :class="previewMode === 'dark' ? 'bg-accent text-white' : 'text-muted'"
              @click="previewMode = 'dark'"
            >
              {{ t('admin.dark') }}
            </button>
          </div>
        </div>
        <div :style="previewVars" class="overflow-hidden rounded-lg border border-border">
          <div style="background: var(--bg)" class="p-5">
            <div style="color: var(--text)" class="text-lg font-bold">Aa Heading</div>
            <p style="color: var(--text-muted)" class="mt-1 text-sm">Muted supporting text.</p>
            <div class="mt-4 flex gap-2">
              <span
                style="background: var(--accent-strong); color: #fff"
                class="rounded-md px-3 py-1.5 text-sm font-semibold"
                >Button</span
              >
              <span
                style="border: 1px solid var(--border); color: var(--text)"
                class="rounded-md px-3 py-1.5 text-sm"
                >Ghost</span
              >
            </div>
            <div class="mt-4 flex gap-1.5">
              <span
                v-for="k in [
                  '--surface',
                  '--surface-2',
                  '--surface-3',
                  '--border',
                  '--accent',
                  '--glow',
                ]"
                :key="k"
                :style="{ background: `var(${k})` }"
                class="h-6 w-6 rounded border border-border"
                :title="k"
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
