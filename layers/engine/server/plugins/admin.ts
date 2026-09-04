/**
 * Seeds the first dashboard admin on first boot (only when no users exist).
 * Credentials come from env so each deployment sets its own:
 *   NUXT_ADMIN_EMAIL / NUXT_ADMIN_PASSWORD
 * Dev falls back to admin@example.com / password — override in production.
 */
export default defineNitroPlugin(async () => {
  if (countUsers() > 0) return

  const email = process.env.NUXT_ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.NUXT_ADMIN_PASSWORD || 'password'

  const hash = await hashPassword(password)
  createUser(email, hash)

  if (!process.env.NUXT_ADMIN_PASSWORD) {
    console.warn(
      `[auth] Seeded default admin "${email}" with password "password". ` +
        `Set NUXT_ADMIN_EMAIL / NUXT_ADMIN_PASSWORD before deploying.`,
    )
  }
})
