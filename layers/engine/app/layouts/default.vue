<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSiteConfig } from '../composables/useSiteConfig'

const { t } = useI18n()
const { config } = useSiteConfig()

// scroll-to-top shows by default; a template can disable it via config.features
const showScrollTop = computed(() => config.features?.scrollTop !== false)
</script>

<template>
  <div class="min-h-screen bg-bg text-text">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
    >
      {{ t('skipToContent') }}
    </a>

    <AppHeader />

    <main id="main">
      <slot />
    </main>

    <AppFooter />

    <ScrollToTop v-if="showScrollTop" />
  </div>
</template>
