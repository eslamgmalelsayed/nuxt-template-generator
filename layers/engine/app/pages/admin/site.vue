<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useState } from 'nuxt/app'
import { useSiteContent } from '../../composables/useSiteContent'
import { useSchemas } from '../../composables/useSchemas'
import { cleanData, validateFields } from '../../admin/schemaUtils'
import type { SiteConfig, ThemeConfig } from '../../types/template'

definePageMeta({ layout: 'admin', middleware: 'auth' })
defineI18nRoute(false)

const { t, locale } = useI18n()
const loc = computed(() => locale.value as 'en' | 'ar')
const { config } = useSiteContent()
const { site: siteSchema } = useSchemas()

// Full clone; the Site page edits only the site-level fields (siteSchema),
// sections + key are preserved on save.
const draft = reactive(JSON.parse(JSON.stringify(config)) as SiteConfig)

const content = useState<{ site: SiteConfig | null; theme: ThemeConfig | null } | null>(
  'site-content',
)

const errors = ref<string[]>([])
const saving = ref(false)
const saved = ref(false)

async function save() {
  errors.value = validateFields(siteSchema, draft as unknown as Record<string, unknown>, loc.value)
  saved.value = false
  if (errors.value.length) return

  saving.value = true
  try {
    const cleaned = cleanData(siteSchema, draft as unknown as Record<string, unknown>)
    const site = { ...draft, ...cleaned }
    const fresh = await $fetch('/api/content', { method: 'PUT', body: { site } })
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
  <div class="mx-auto max-w-3xl px-6 py-8">
    <div class="mb-6 flex items-center justify-between gap-4">
      <h1 class="h3 text-text">{{ t('admin.site') }}</h1>
      <div class="flex items-center gap-3">
        <span v-if="saved" role="status" class="text-sm" style="color: var(--accent)"
          >✓ {{ t('admin.saved') }}</span
        >
        <button class="btn-primary !min-h-10 !px-6 !py-2" :disabled="saving" @click="save">
          {{ saving ? t('admin.saving') : t('admin.saveSite') }}
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

    <AdminSchemaForm :fields="siteSchema" :model="draft as unknown as Record<string, unknown>" />
  </div>
</template>
