<script setup lang="ts">
// Dashboard shell — separate from the marketing layout. A slim top bar with
// session actions; pages fill the body. Reuses the theme tokens from app.vue.
import { navigateTo } from 'nuxt/app'
import { useUserSession } from '#imports'

const { user, loggedIn, clear: clearSession } = useUserSession()

// Makes the dashboard installable: the manifest link must be present on the
// page the user installs from. Scoped to the admin layout so it rides on /admin.
useHead({
  link: [{ rel: 'manifest', href: '/manifest.webmanifest' }],
  meta: [{ name: 'theme-color', content: '#0f9d70' }],
})

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
          <span class="font-semibold text-text">Dashboard</span>
          <nav class="flex items-center gap-1 text-sm">
            <NuxtLink
              to="/admin"
              class="rounded-md px-2.5 py-1 text-muted hover:text-text"
              exact-active-class="!text-text font-medium"
            >
              Content
            </NuxtLink>
            <NuxtLink
              to="/admin/theme"
              class="rounded-md px-2.5 py-1 text-muted hover:text-text"
              active-class="!text-text font-medium"
            >
              Theme
            </NuxtLink>
            <NuxtLink
              to="/admin/site"
              class="rounded-md px-2.5 py-1 text-muted hover:text-text"
              active-class="!text-text font-medium"
            >
              Site
            </NuxtLink>
          </nav>
        </div>
        <div class="flex items-center gap-4 text-sm">
          <a href="/" target="_blank" class="text-muted hover:text-accent">View site ↗</a>
          <span class="hidden text-muted sm:inline">{{ user?.email }}</span>
          <button class="btn-ghost !min-h-9 !px-4 !py-1.5" @click="logout">Sign out</button>
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
