import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useUserSession } from '#imports'

/**
 * Guards dashboard pages. Attach with definePageMeta({ middleware: 'auth' }).
 * Redirects to the login page when there is no active session.
 */
export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) {
    return navigateTo('/admin/login')
  }
})
