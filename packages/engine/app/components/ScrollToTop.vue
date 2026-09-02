<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useWindowScroll, useMediaQuery } from '@vueuse/core'

// Floating back-to-top button — appears after scrolling down, RTL-aware
// position (trailing side), smooth unless prefers-reduced-motion.
const { t } = useI18n()
const { y } = useWindowScroll()
const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
const visible = computed(() => y.value > 400)

function toTop() {
  window.scrollTo({ top: 0, behavior: reduced.value ? 'auto' : 'smooth' })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-2 opacity-0"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="translate-y-2 opacity-0"
  >
    <button
      v-show="visible"
      type="button"
      class="fixed end-6 bottom-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition hover:brightness-110"
      style="background: var(--accent-strong)"
      :aria-label="t('scrollTop')"
      @click="toTop"
    >
      <svg
        viewBox="0 0 24 24"
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>
