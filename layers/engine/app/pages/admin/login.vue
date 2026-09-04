<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { navigateTo } from 'nuxt/app'
import { useUserSession } from '#imports'

definePageMeta({ layout: 'admin' })
defineI18nRoute(false) // dashboard is not localized

const { loggedIn, fetch: refreshSession } = useUserSession()

// Already signed in → skip the login screen.
onMounted(() => {
  if (loggedIn.value) navigateTo('/admin')
})

const email = ref('')
const password = ref('')
const error = ref('')
const pending = ref(false)

async function onSubmit() {
  error.value = ''
  pending.value = true
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })
    await refreshSession()
    await navigateTo('/admin')
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string }; statusMessage?: string }
    error.value = err?.data?.statusMessage || err?.statusMessage || 'Sign in failed'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="grid min-h-screen place-items-center px-6">
    <div class="w-full max-w-sm">
      <h1 class="h3 text-text">Dashboard</h1>
      <p class="mt-1 text-sm text-muted">Sign in to manage your site content.</p>

      <form class="mt-8 grid gap-4" novalidate @submit.prevent="onSubmit">
        <div class="grid gap-1.5">
          <label for="email" class="text-sm font-medium text-text">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            autocomplete="username"
            required
            class="field"
          />
        </div>
        <div class="grid gap-1.5">
          <label for="password" class="text-sm font-medium text-text">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            autocomplete="current-password"
            required
            class="field"
          />
        </div>

        <p v-if="error" role="alert" class="text-sm" style="color: var(--danger)">
          {{ error }}
        </p>

        <button type="submit" class="btn-primary mt-2" :disabled="pending">
          {{ pending ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.field {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  padding: 0.7rem 0.9rem;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}
.field:focus {
  outline: none;
  border-color: var(--accent);
}
</style>
