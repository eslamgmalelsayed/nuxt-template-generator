<script setup lang="ts">
// A recursive form control for one schema Field. It reads/writes parent[pkey]
// in place — `parent` is a node of the page's reactive draft (shared by
// reference), so mutations flow back without an event chain. Writes go through
// the `container()` helper / computed setters, keeping the prop binding itself
// untouched.
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Field } from '../../types/schema'
import { defaultForField, resolveLabel } from '../../admin/schemaUtils'

const { locale, t } = useI18n()

const props = defineProps<{
  field: Field
  parent: Record<string, unknown> | unknown[]
  pkey: string | number
}>()

type Any = Record<string, unknown> & { en?: string; ar?: string }

// Ensure object-shaped fields have a value before the template reads into them.
// Optional groups are left absent (the UI offers an "Add" button) so visiting a
// form never silently materializes an optional block.
function container(): Record<string | number, unknown> {
  return props.parent as unknown as Record<string | number, unknown>
}
const ftype = props.field.type
if (
  container()[props.pkey] == null &&
  (ftype === 'localized' ||
    ftype === 'localized-multiline' ||
    ftype === 'array' ||
    (ftype === 'group' && !props.field.optional))
) {
  container()[props.pkey] = defaultForField(props.field)
}

function addGroup() {
  container()[props.pkey] = defaultForField(props.field)
}
function removeGroup() {
  container()[props.pkey] = undefined
}

// Writable binding for primitive controls.
const model = computed({
  get: () => container()[props.pkey],
  set: (v) => {
    container()[props.pkey] = v
  },
})

const obj = computed(() => container()[props.pkey] as Any)
const list = computed(() => container()[props.pkey] as unknown[])

function addItem() {
  const arr = container()[props.pkey] as unknown[]
  if (props.field.type === 'array') arr.push(defaultForField(props.field.item))
}
function removeItem(i: number) {
  ;(container()[props.pkey] as unknown[]).splice(i, 1)
}

const isLocalized = computed(
  () => props.field.type === 'localized' || props.field.type === 'localized-multiline',
)

// Localized label resolution against the current dashboard language.
const loc = computed(() => locale.value as 'en' | 'ar')
const label = computed(() => resolveLabel(props.field.label, loc.value))
const help = computed(() => resolveLabel(props.field.help, loc.value))
const itemLabel = computed(() =>
  props.field.type === 'array'
    ? resolveLabel(props.field.itemLabel, loc.value) || t('admin.item')
    : t('admin.item'),
)

// Image upload
const uploading = ref(false)
const uploadError = ref('')
async function onUpload(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  uploading.value = true
  uploadError.value = ''
  try {
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch<{ path: string }>('/api/uploads', { method: 'POST', body: fd })
    model.value = res.path
  } catch (err: unknown) {
    const x = err as { data?: { statusMessage?: string } }
    uploadError.value = x?.data?.statusMessage || 'Upload failed'
  } finally {
    uploading.value = false
    input.value = ''
  }
}
</script>

<template>
  <div class="grid gap-1.5">
    <label v-if="label" class="text-sm font-medium text-text">
      {{ label }}
      <span v-if="!field.optional" aria-hidden="true" class="text-[var(--danger)]">*</span>
    </label>
    <p v-if="help" class="-mt-1 text-xs text-muted">{{ help }}</p>

    <!-- localized single / multiline: EN + AR pair -->
    <div v-if="isLocalized" class="grid gap-2 sm:grid-cols-2">
      <div class="grid gap-1">
        <span class="text-[11px] uppercase tracking-wide text-muted">EN</span>
        <textarea
          v-if="field.type === 'localized-multiline'"
          v-model="obj.en"
          rows="3"
          dir="ltr"
          class="af resize-y"
        />
        <input v-else v-model="obj.en" type="text" dir="ltr" class="af" />
      </div>
      <div class="grid gap-1">
        <span class="text-[11px] uppercase tracking-wide text-muted">AR</span>
        <textarea
          v-if="field.type === 'localized-multiline'"
          v-model="obj.ar"
          rows="3"
          dir="rtl"
          class="af resize-y"
        />
        <input v-else v-model="obj.ar" type="text" dir="rtl" class="af" />
      </div>
    </div>

    <!-- select / icon -->
    <select v-else-if="field.type === 'select'" v-model="model" class="af">
      <option v-for="o in field.options" :key="o.value" :value="o.value">{{ o.label }}</option>
    </select>
    <select v-else-if="field.type === 'icon'" v-model="model" class="af">
      <option
        v-for="ic in ['bolt', 'bulb', 'grid', 'shield', 'cpu', 'chart']"
        :key="ic"
        :value="ic"
      >
        {{ ic }}
      </option>
    </select>

    <!-- number -->
    <input v-else-if="field.type === 'number'" v-model.number="model" type="number" class="af" />

    <!-- boolean -->
    <input
      v-else-if="field.type === 'boolean'"
      type="checkbox"
      class="h-4 w-4 justify-self-start"
      :checked="!!model"
      @change="model = ($event.target as HTMLInputElement).checked"
    />

    <!-- color: swatch picker + hex -->
    <div v-else-if="field.type === 'color'" class="flex items-center gap-2">
      <input
        type="color"
        :value="(model as string) || '#000000'"
        class="h-9 w-11 shrink-0 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
        @input="model = ($event.target as HTMLInputElement).value"
      />
      <input v-model="model" type="text" spellcheck="false" class="af font-mono" />
    </div>

    <!-- image: upload to the volume, or paste a path -->
    <div v-else-if="field.type === 'image'" class="grid gap-2">
      <div class="flex items-center gap-3">
        <img
          v-if="model"
          :src="model as string"
          alt=""
          class="h-14 w-14 rounded-md border border-border object-cover"
        />
        <label
          class="cursor-pointer rounded-md border border-border px-3 py-1.5 text-sm text-text hover:border-accent"
        >
          {{ uploading ? t('admin.uploading') : t('admin.uploadImage') }}
          <input type="file" accept="image/*" class="hidden" @change="onUpload" />
        </label>
        <button v-if="model" type="button" class="text-xs text-[var(--danger)]" @click="model = ''">
          {{ t('admin.remove') }}
        </button>
      </div>
      <input v-model="model" type="text" placeholder="/uploads/…" class="af font-mono text-xs" />
      <p v-if="uploadError" class="text-xs" style="color: var(--danger)">{{ uploadError }}</p>
    </div>

    <!-- group: nested object (optional groups can be added/removed) -->
    <div v-else-if="field.type === 'group'">
      <button
        v-if="field.optional && obj == null"
        type="button"
        class="rounded-md border border-dashed border-border px-3 py-2 text-sm text-muted hover:border-accent hover:text-text"
        @click="addGroup"
      >
        + {{ t('admin.add') }} {{ label }}
      </button>
      <fieldset v-else class="rounded-md border border-border p-4">
        <div v-if="field.optional" class="mb-3 flex justify-end">
          <button type="button" class="text-xs text-[var(--danger)]" @click="removeGroup">
            {{ t('admin.remove') }}
          </button>
        </div>
        <AdminSchemaForm :fields="field.fields" :model="obj" />
      </fieldset>
    </div>

    <!-- array: repeatable items -->
    <div v-else-if="field.type === 'array'" class="grid gap-3">
      <div v-for="(_, i) in list" :key="i" class="rounded-md border border-border p-4">
        <div class="mb-2 flex items-center justify-between">
          <span class="text-xs font-semibold uppercase tracking-wide text-muted">
            {{ itemLabel }} {{ i + 1 }}
          </span>
          <button type="button" class="text-xs text-[var(--danger)]" @click="removeItem(i)">
            {{ t('admin.remove') }}
          </button>
        </div>
        <AdminFieldControl :field="field.item" :parent="list" :pkey="i" />
      </div>
      <button
        type="button"
        class="justify-self-start rounded-md border border-border px-3 py-1.5 text-sm text-text hover:border-accent"
        @click="addItem"
      >
        + {{ t('admin.add') }} {{ itemLabel }}
      </button>
    </div>

    <!-- plain text -->
    <input
      v-else
      v-model="model"
      type="text"
      :placeholder="'placeholder' in field ? field.placeholder : ''"
      class="af"
    />
  </div>
</template>

<style scoped>
.af {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}
.af:focus {
  outline: none;
  border-color: var(--accent);
}
</style>
