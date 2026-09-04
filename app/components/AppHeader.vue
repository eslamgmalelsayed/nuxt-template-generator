<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { onClickOutside, useScrollLock, useWindowScroll } from '@vueuse/core'

const { config, tl } = useSiteContent()
const { t } = useI18n()

const { y } = useWindowScroll()
const scrolled = ref(false)
watch(y, (v) => (scrolled.value = v > 12))

const open = ref(false)
const panel = ref<HTMLElement | null>(null)
const toggleBtn = ref<HTMLElement | null>(null)
const isLocked = useScrollLock(import.meta.client ? document.body : null)

watch(open, (v) => {
  isLocked.value = v
})

onClickOutside(
  panel,
  () => {
    if (open.value) open.value = false
  },
  { ignore: [toggleBtn] },
)

function close() {
  open.value = false
  toggleBtn.value?.focus()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="
      scrolled ? 'border-b border-border bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
    "
    @keydown="onKeydown"
  >
    <div class="container-x flex h-18 items-center justify-between gap-4 py-3">
      <!-- Brand -->
      <a href="#hero" class="group flex items-center gap-3">
        <span
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white"
          style="background: var(--accent)"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-5 w-5"
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
        <span class="leading-tight">
          <span class="block heading-display text-lg text-text">{{ config.brand.name }}</span>
          <span class="block text-[11px] uppercase tracking-wider text-muted">{{
            config.brand.subBrand
          }}</span>
        </span>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-1 lg:flex" :aria-label="t('nav.menu')">
        <a
          v-for="item in config.nav"
          :key="item.to"
          :href="item.to"
          class="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:text-text"
        >
          {{ tl(item.label) }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <LocaleSwitcher class="hidden sm:inline-flex" />
        <ThemeToggle />
        <a href="#contact" class="btn-primary hidden lg:inline-flex">{{ t('cta.getQuote') }}</a>

        <!-- Mobile toggle -->
        <button
          ref="toggleBtn"
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text lg:hidden"
          :aria-label="open ? t('nav.closeMenu') : t('nav.openMenu')"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          @click="open = !open"
        >
          <svg
            v-if="!open"
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="open"
        id="mobile-menu"
        ref="panel"
        class="border-b border-border bg-surface lg:hidden"
      >
        <nav class="container-x flex flex-col gap-1 py-4" :aria-label="t('nav.menu')">
          <a
            v-for="item in config.nav"
            :key="item.to"
            :href="item.to"
            class="rounded-xl px-4 py-3 text-base font-medium text-text transition hover:bg-surface-2"
            @click="close"
          >
            {{ tl(item.label) }}
          </a>
          <div class="mt-2 flex items-center gap-2">
            <LocaleSwitcher />
            <a href="#contact" class="btn-primary flex-1" @click="close">{{ t('cta.getQuote') }}</a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
