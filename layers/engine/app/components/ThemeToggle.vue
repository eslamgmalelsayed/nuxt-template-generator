<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMediaQuery } from '@vueuse/core'

const colorMode = useColorMode()
const { t } = useI18n()
const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')

const isDark = computed(() => colorMode.value === 'dark')
const label = computed(() => (isDark.value ? t('theme.toLight') : t('theme.toDark')))

function toggle() {
  const apply = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }
  // View Transitions API animates the whole-page color change as a crossfade.
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
  if (!reduced.value && typeof doc.startViewTransition === 'function') {
    doc.startViewTransition(apply)
  } else {
    apply()
  }
}
</script>

<template>
  <button
    type="button"
    class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text transition hover:border-accent"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="rotate-90 scale-0 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-rotate-90 scale-0 opacity-0"
    >
      <!-- sun (shown in dark mode: click -> light) -->
      <svg
        v-if="isDark"
        key="sun"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          stroke-linecap="round"
          d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"
        />
      </svg>
      <!-- moon (shown in light mode: click -> dark) -->
      <svg
        v-else
        key="moon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
        />
      </svg>
    </Transition>
  </button>
</template>
