<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSiteConfig } from '../composables/useSiteConfig'

const { config, tl } = useSiteConfig()
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border bg-surface">
    <div class="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <div class="flex items-center gap-3">
          <span
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white"
            style="background: var(--accent)"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
              />
            </svg>
          </span>
          <span class="heading-display text-lg text-text">{{ config.brand.name }}</span>
        </div>
        <p class="mt-4 max-w-sm text-sm leading-relaxed text-muted">
          {{ tl(config.footer?.note) }}
        </p>
      </div>

      <nav :aria-label="t('footer.quickLinks')">
        <h2 class="text-xs font-semibold uppercase tracking-wider text-muted">
          {{ t('footer.quickLinks') }}
        </h2>
        <ul class="mt-4 space-y-2">
          <li v-for="item in config.nav" :key="item.to">
            <a :href="item.to" class="text-sm text-text transition hover:text-accent">{{
              tl(item.label)
            }}</a>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="text-xs font-semibold uppercase tracking-wider text-muted">
          {{ t('contact.emailLabel') }}
        </h2>
        <ul class="mt-4 space-y-2 text-sm text-text">
          <li>
            <a :href="`mailto:${config.organization.email}`" class="transition hover:text-accent">{{
              config.organization.email
            }}</a>
          </li>
          <li>
            <a
              :href="`tel:${config.organization.phone.replace(/\s/g, '')}`"
              class="transition hover:text-accent"
              >{{ config.organization.phone }}</a
            >
          </li>
          <li class="text-muted">{{ config.organization.addressLocality }}</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-border">
      <div
        class="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row"
      >
        <p>
          © {{ year }} {{ config.brand.name }} — {{ config.brand.subBrand }}.
          {{ t('footer.rights') }}
        </p>
        <p>{{ tl(config.brand.tagline) }}</p>
      </div>
    </div>
  </footer>
</template>
