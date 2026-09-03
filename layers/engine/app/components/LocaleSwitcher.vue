<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const other = computed<'en' | 'ar'>(() => (locale.value === 'ar' ? 'en' : 'ar'))
const otherLabel = computed(() => (other.value === 'ar' ? 'العربية' : 'English'))

// Strip any URL hash: it is never sent to the server, so keeping it would make
// the server-rendered href differ from the client's (hydration mismatch).
const target = computed(() => switchLocalePath(other.value).split('#')[0])
</script>

<template>
  <NuxtLink
    :to="target"
    class="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold text-text transition hover:border-accent"
    :aria-label="`${t('locale.label')}: ${otherLabel}`"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="h-4 w-4"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </svg>
    <span>{{ otherLabel }}</span>
  </NuxtLink>
</template>
