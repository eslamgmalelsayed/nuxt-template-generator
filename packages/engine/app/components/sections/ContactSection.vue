<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import * as v from 'valibot'
import { useSiteConfig } from '../../composables/useSiteConfig'
import { useForm } from '../../composables/useForm'
import type { ContactData } from '../../types/template'

defineProps<{ sectionId: string; data: ContactData }>()
const { tl } = useSiteConfig()
const { t } = useI18n()

// Schema = single source of truth. Messages are localized (current locale).
const schema = v.object({
  name: v.pipe(v.string(), v.trim(), v.nonEmpty(t('form.errors.required'))),
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty(t('form.errors.required')),
    v.email(t('form.errors.email')),
  ),
  company: v.optional(v.string(), ''),
  message: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty(t('form.errors.required')),
    v.minLength(10, t('form.errors.minMessage')),
  ),
})

const form = useForm(schema, { name: '', email: '', company: '', message: '' })
const sent = ref(false)

function onSubmit() {
  sent.value = false
  const firstInvalid = form.submit(() => {
    // Demo: no network. A real site would POST here (or to a 3rd-party/serverless endpoint).
    sent.value = true
  })
  if (firstInvalid) {
    requestAnimationFrame(() => document.getElementById(`c-${firstInvalid}`)?.focus())
  }
}
</script>

<template>
  <section :id="sectionId" class="section">
    <div class="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      <!-- Info -->
      <div>
        <p v-if="data.eyebrow" class="eyebrow">{{ tl(data.eyebrow) }}</p>
        <h2 class="h2 mt-4 text-text">{{ tl(data.heading) }}</h2>
        <p v-if="data.intro" class="mt-4 max-w-md body-lg text-muted">{{ tl(data.intro) }}</p>

        <dl class="mt-8 space-y-4">
          <div class="flex items-start gap-3">
            <dt class="w-24 shrink-0 text-sm font-semibold text-muted">
              {{ t('contact.emailLabel') }}
            </dt>
            <dd>
              <a :href="`mailto:${data.email}`" class="text-text transition hover:text-accent">{{
                data.email
              }}</a>
            </dd>
          </div>
          <div class="flex items-start gap-3">
            <dt class="w-24 shrink-0 text-sm font-semibold text-muted">
              {{ t('contact.phoneLabel') }}
            </dt>
            <dd>
              <a
                :href="`tel:${data.phone.replace(/\s/g, '')}`"
                class="text-text transition hover:text-accent"
                >{{ data.phone }}</a
              >
            </dd>
          </div>
          <div class="flex items-start gap-3">
            <dt class="w-24 shrink-0 text-sm font-semibold text-muted">
              {{ t('contact.addressLabel') }}
            </dt>
            <dd class="text-text">{{ tl(data.address) }}</dd>
          </div>
        </dl>
      </div>

      <!-- Form -->
      <div class="card">
        <form class="grid gap-4" novalidate @submit.prevent="onSubmit">
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="grid gap-1.5">
              <label for="c-name" class="text-sm font-medium text-text">{{ t('form.name') }}</label>
              <input
                id="c-name"
                v-model="form.values.name"
                type="text"
                name="name"
                autocomplete="name"
                :placeholder="t('form.namePlaceholder')"
                class="field"
                :class="{ 'field-invalid': form.errors.name }"
                :aria-invalid="form.errors.name ? 'true' : undefined"
                :aria-describedby="form.errors.name ? 'c-name-err' : undefined"
                @blur="form.onBlur('name')"
                @input="form.onInput('name')"
              />
              <p v-if="form.errors.name" id="c-name-err" role="alert" class="field-error">
                <span aria-hidden="true">⚠</span> {{ form.errors.name }}
              </p>
            </div>
            <div class="grid gap-1.5">
              <label for="c-email" class="text-sm font-medium text-text">{{
                t('form.email')
              }}</label>
              <input
                id="c-email"
                v-model="form.values.email"
                type="email"
                name="email"
                autocomplete="email"
                :placeholder="t('form.emailPlaceholder')"
                class="field"
                :class="{ 'field-invalid': form.errors.email }"
                :aria-invalid="form.errors.email ? 'true' : undefined"
                :aria-describedby="form.errors.email ? 'c-email-err' : undefined"
                @blur="form.onBlur('email')"
                @input="form.onInput('email')"
              />
              <p v-if="form.errors.email" id="c-email-err" role="alert" class="field-error">
                <span aria-hidden="true">⚠</span> {{ form.errors.email }}
              </p>
            </div>
          </div>
          <div class="grid gap-1.5">
            <label for="c-company" class="text-sm font-medium text-text">{{
              t('form.company')
            }}</label>
            <input
              id="c-company"
              v-model="form.values.company"
              type="text"
              name="company"
              autocomplete="organization"
              :placeholder="t('form.companyPlaceholder')"
              class="field"
            />
          </div>
          <div class="grid gap-1.5">
            <label for="c-message" class="text-sm font-medium text-text">{{
              t('form.message')
            }}</label>
            <textarea
              id="c-message"
              v-model="form.values.message"
              name="message"
              rows="4"
              :placeholder="t('form.messagePlaceholder')"
              class="field resize-y"
              :class="{ 'field-invalid': form.errors.message }"
              :aria-invalid="form.errors.message ? 'true' : undefined"
              :aria-describedby="form.errors.message ? 'c-message-err' : undefined"
              @blur="form.onBlur('message')"
              @input="form.onInput('message')"
            ></textarea>
            <p v-if="form.errors.message" id="c-message-err" role="alert" class="field-error">
              <span aria-hidden="true">⚠</span> {{ form.errors.message }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button type="submit" class="btn-primary">
              {{ tl(data.cta?.label) || t('form.send') }}
            </button>
            <p class="text-xs text-muted">{{ t('form.note') }}</p>
          </div>

          <p v-if="sent" role="status" class="text-sm font-medium" style="color: var(--accent)">
            ✓ {{ t('form.success') }}
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.field {
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  padding: 0.7rem 0.9rem;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}
.field::placeholder {
  color: color-mix(in srgb, var(--text-muted) 80%, transparent);
}
.field:focus {
  outline: none;
  border-color: var(--accent);
}
.field-invalid {
  border-color: var(--danger);
}
.field-error {
  color: var(--danger);
  font-size: 0.8rem;
}
</style>
