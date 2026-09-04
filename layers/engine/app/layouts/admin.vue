<script setup lang="ts">
// Dashboard shell — separate from the marketing layout. A slim top bar with
// language + theme controls and session actions; pages fill the body. Reuses
// the theme tokens from app.vue, so the dark toggle re-skins it too.
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { navigateTo } from 'nuxt/app'
import { useUserSession } from '#imports'

const { user, loggedIn, clear: clearSession } = useUserSession()
const { t, locale, setLocale } = useI18n()

// Makes the dashboard installable: the manifest link must be present on the
// page the user installs from. Scoped to the admin layout so it rides on /admin.
useHead({
  link: [{ rel: 'manifest', href: '/manifest.webmanifest' }],
  meta: [{ name: 'theme-color', content: '#0f9d70' }],
})

// Dashboard language switch (session-scoped; admin routes aren't localized).
const otherLocale = computed(() => (locale.value === 'ar' ? 'en' : 'ar'))
const otherLabel = computed(() =>
  otherLocale.value === 'ar' ? t('admin.toArabic') : t('admin.toEnglish'),
)
function switchLang() {
  setLocale(otherLocale.value)
}

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clearSession()
  await navigateTo('/admin/login')
}
</script>

<template>
  <div class="admin min-h-screen bg-bg text-text">
    <header
      v-if="loggedIn"
      class="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur"
    >
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
        <div class="flex items-center gap-5">
          <span class="font-semibold text-text">{{ t('admin.dashboard') }}</span>
          <nav class="flex items-center gap-1 text-sm">
            <NuxtLink
              to="/admin"
              class="rounded-md px-2.5 py-1 text-muted hover:text-text"
              exact-active-class="!text-text font-medium"
            >
              {{ t('admin.content') }}
            </NuxtLink>
            <NuxtLink
              to="/admin/theme"
              class="rounded-md px-2.5 py-1 text-muted hover:text-text"
              active-class="!text-text font-medium"
            >
              {{ t('admin.theme') }}
            </NuxtLink>
            <NuxtLink
              to="/admin/site"
              class="rounded-md px-2.5 py-1 text-muted hover:text-text"
              active-class="!text-text font-medium"
            >
              {{ t('admin.site') }}
            </NuxtLink>
          </nav>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <a href="/" target="_blank" class="hidden text-muted hover:text-accent sm:inline">
            {{ t('admin.viewSite') }} ↗
          </a>
          <button
            type="button"
            class="rounded-md border border-border px-2.5 py-1 font-medium text-text hover:border-accent"
            :aria-label="otherLabel"
            @click="switchLang"
          >
            {{ otherLabel }}
          </button>
          <ThemeToggle class="!h-9 !w-9" />
          <span class="hidden text-muted lg:inline">{{ user?.email }}</span>
          <button class="btn-ghost !min-h-9 !px-4 !py-1.5" @click="logout">
            {{ t('admin.signOut') }}
          </button>
        </div>
      </div>
    </header>

    <slot />
  </div>
</template>

<style scoped>
.admin {
  font-family: var(--font-body, ui-sans-serif, system-ui, sans-serif);
}
</style>
