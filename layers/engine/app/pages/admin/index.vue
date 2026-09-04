<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useState } from 'nuxt/app'
import { useSiteContent } from '../../composables/useSiteContent'
import { useSchemas } from '../../composables/useSchemas'
import { cleanData, validateFields, defaultForField, resolveLabel } from '../../admin/schemaUtils'
import type { SiteConfig, ThemeConfig, SectionComponent } from '../../types/template'

definePageMeta({ layout: 'admin', middleware: 'auth' })
defineI18nRoute(false)

const { t, locale } = useI18n()
const loc = computed(() => locale.value as 'en' | 'ar')
const { config } = useSiteContent()
const { sections: sectionSchemas } = useSchemas()

// Editable deep clone of the live content (plain JSON → safe to mutate freely).
const draft = reactive(JSON.parse(JSON.stringify(config)) as SiteConfig)

const selected = ref(0)
const current = computed(() => draft.sections[selected.value])
const currentSchema = computed(() => sectionSchemas[current.value.component])

const errors = ref<string[]>([])
const saving = ref(false)
const saved = ref(false)

function labelFor(kind: string) {
  return resolveLabel(sectionSchemas[kind as keyof typeof sectionSchemas]?.label, loc.value) || kind
}

// --- section management ---
const kinds = Object.keys(sectionSchemas) as SectionComponent[]
const newKind = ref<SectionComponent>(kinds[0])

function addSection() {
  const schema = sectionSchemas[newKind.value]
  if (!schema) return
  const data: Record<string, unknown> = {}
  for (const f of schema.fields) data[f.key] = defaultForField(f)
  const base = String(newKind.value).replace('Section', '').toLowerCase()
  draft.sections.push({
    id: `${base}-${Date.now().toString(36)}`,
    component: newKind.value,
    variant: schema.variants?.[0]?.value ?? 'default',
    enabled: true,
    data,
  })
  selected.value = draft.sections.length - 1
}

function removeSection(i: number) {
  draft.sections.splice(i, 1)
  if (selected.value >= draft.sections.length) {
    selected.value = Math.max(0, draft.sections.length - 1)
  }
}

function moveSection(i: number, dir: -1 | 1) {
  const j = i + dir
  if (j < 0 || j >= draft.sections.length) return
  const arr = draft.sections
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
  selected.value = j
}

const content = useState<{ site: SiteConfig | null; theme: ThemeConfig | null } | null>(
  'site-content',
)

async function save() {
  errors.value = []
  saved.value = false

  const sections = draft.sections.map((s) => {
    const schema = sectionSchemas[s.component]
    if (!schema) return s
    const label = resolveLabel(schema.label, loc.value)
    for (const e of validateFields(schema.fields, s.data as Record<string, unknown>, loc.value)) {
      errors.value.push(`${label}: ${e}`)
    }
    return { ...s, data: cleanData(schema.fields, s.data as Record<string, unknown>) }
  })
  if (errors.value.length) return

  saving.value = true
  try {
    const site = { ...draft, sections }
    const fresh = await $fetch('/api/content', { method: 'PUT', body: { site } })
    if (content.value) content.value = fresh
    saved.value = true
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string } }
    errors.value = [err?.data?.statusMessage || 'Save failed']
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-8">
    <div class="mb-6 flex items-center justify-between gap-4">
      <h1 class="h3 text-text">{{ t('admin.content') }}</h1>
      <div class="flex items-center gap-3">
        <span v-if="saved" role="status" class="text-sm" style="color: var(--accent)"
          >✓ {{ t('admin.saved') }}</span
        >
        <button class="btn-primary !min-h-10 !px-6 !py-2" :disabled="saving" @click="save">
          {{ saving ? t('admin.saving') : t('admin.save') }}
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

    <div class="grid gap-8 md:grid-cols-[200px_1fr]">
      <!-- Section list + add -->
      <nav class="grid content-start gap-1">
        <button
          v-for="(s, i) in draft.sections"
          :key="s.id"
          class="flex items-center justify-between gap-2 rounded-md px-3 py-2 text-start text-sm transition"
          :class="
            i === selected
              ? 'bg-accent text-white'
              : 'text-muted hover:bg-surface-2 hover:text-text'
          "
          @click="selected = i"
        >
          <span>{{ labelFor(s.component) }}</span>
          <span v-if="s.enabled === false" class="text-xs opacity-70">{{ t('admin.hidden') }}</span>
        </button>

        <div class="mt-3 flex gap-1 border-t border-border pt-3">
          <select v-model="newKind" class="af-inline min-w-0 flex-1">
            <option v-for="k in kinds" :key="k" :value="k">{{ labelFor(k) }}</option>
          </select>
          <button
            class="rounded-md border border-border px-3 text-sm text-text hover:border-accent"
            :title="t('admin.addSection')"
            @click="addSection"
          >
            +
          </button>
        </div>
      </nav>

      <!-- Editor for the selected section -->
      <section v-if="currentSchema" class="min-w-0">
        <div class="mb-5 flex flex-wrap items-center gap-3">
          <h2 class="text-lg font-semibold text-text">
            {{ resolveLabel(currentSchema.label, loc) }}
          </h2>
          <label v-if="currentSchema.variants" class="flex items-center gap-2 text-sm text-muted">
            {{ t('admin.layout') }}
            <select v-model="current.variant" class="af-inline">
              <option v-for="v in currentSchema.variants" :key="v.value" :value="v.value">
                {{ v.label }}
              </option>
            </select>
          </label>

          <div class="ms-auto flex items-center gap-2 text-sm">
            <label class="flex items-center gap-1.5 text-muted">
              <input
                type="checkbox"
                :checked="current.enabled !== false"
                @change="current.enabled = ($event.target as HTMLInputElement).checked"
              />
              {{ t('admin.visible') }}
            </label>
            <button
              class="rounded border border-border px-2 py-1 text-muted enabled:hover:text-text disabled:opacity-40"
              :disabled="selected === 0"
              :title="t('admin.moveUp')"
              @click="moveSection(selected, -1)"
            >
              ↑
            </button>
            <button
              class="rounded border border-border px-2 py-1 text-muted enabled:hover:text-text disabled:opacity-40"
              :disabled="selected === draft.sections.length - 1"
              :title="t('admin.moveDown')"
              @click="moveSection(selected, 1)"
            >
              ↓
            </button>
            <button
              class="px-1 text-[var(--danger)]"
              :title="t('admin.deleteSection')"
              @click="removeSection(selected)"
            >
              {{ t('admin.delete') }}
            </button>
          </div>
        </div>

        <AdminSchemaForm
          :fields="currentSchema.fields"
          :model="current.data as Record<string, unknown>"
        />
      </section>
      <section v-else class="text-sm text-muted">
        {{ t('admin.noEditor') }} “{{ current.component }}”.
      </section>
    </div>
  </div>
</template>

<style scoped>
.af-inline {
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  padding: 0.35rem 0.6rem;
  font-size: 0.85rem;
}
</style>
