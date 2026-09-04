/**
 * Admin users for the dashboard. Single-tenant: typically one admin, seeded on
 * first boot from env (see server/plugins/admin.ts). Passwords are stored only
 * as scrypt hashes via nuxt-auth-utils' hashPassword/verifyPassword.
 */

export interface UserRow {
  id: number
  email: string
  password_hash: string
  created_at: number
}

export function getUserByEmail(email: string): UserRow | null {
  const row = getDb().prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase()) as
    UserRow | undefined
  return row ?? null
}

export function countUsers(): number {
  const row = getDb().prepare('SELECT COUNT(*) AS n FROM users').get() as { n: number }
  return row.n
}

export function createUser(email: string, passwordHash: string): void {
  getDb()
    .prepare('INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)')
    .run(email.toLowerCase(), passwordHash, Date.now())
}
