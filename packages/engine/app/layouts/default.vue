<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
  </div>
</template>
