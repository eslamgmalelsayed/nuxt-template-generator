<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSiteConfig } from '../../composables/useSiteConfig'
import type { ContactData } from '../../types/template'

defineProps<{ sectionId: string; data: ContactData }>()
const { tl } = useSiteConfig()
const { t } = useI18n()

const submitted = ref(false)
function onSubmit() {
  // Demo form — does not send anywhere.
  submitted.value = true
}
</script>

<template>
  <section :id="sectionId" class="py-20 lg:py-28">
    <div class="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      <!-- Info -->
      <div>
        <p v-if="data.eyebrow" class="eyebrow">{{ tl(data.eyebrow) }}</p>
        <h2 class="heading-display mt-4 text-3xl text-text sm:text-4xl">{{ tl(data.heading) }}</h2>
        <p v-if="data.intro" class="mt-4 max-w-md text-lg text-muted">{{ tl(data.intro) }}</p>

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
                type="text"
                name="name"
                autocomplete="name"
                :placeholder="t('form.namePlaceholder')"
                class="field"
              />
            </div>
            <div class="grid gap-1.5">
              <label for="c-email" class="text-sm font-medium text-text">{{
                t('form.email')
              }}</label>
              <input
                id="c-email"
                type="email"
                name="email"
                autocomplete="email"
                :placeholder="t('form.emailPlaceholder')"
                class="field"
              />
            </div>
          </div>
          <div class="grid gap-1.5">
            <label for="c-company" class="text-sm font-medium text-text">{{
              t('form.company')
            }}</label>
            <input
              id="c-company"
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
              name="message"
              rows="4"
              :placeholder="t('form.messagePlaceholder')"
              class="field resize-y"
            ></textarea>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button type="submit" class="btn-primary">
              {{ tl(data.cta?.label) || t('form.send') }}
            </button>
            <p class="text-xs text-muted">{{ t('form.note') }}</p>
          </div>

          <p
            v-if="submitted"
            role="status"
            class="text-sm font-medium"
            style="color: var(--accent)"
          >
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
</style>
