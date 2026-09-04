import { existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import Database from 'better-sqlite3'

/**
 * Single SQLite connection for the whole server process.
 *
 * The DB file lives on a mounted volume in production (Docker) so content
 * survives container restarts. Path comes from runtimeConfig.databasePath
 * (override in prod with NUXT_DATABASE_PATH), defaulting to ./data/app.db.
 */
let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (db) return db

  const configured = useRuntimeConfig().databasePath || './data/app.db'
  const path = resolve(process.cwd(), configured)

  const dir = dirname(path)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

  db = new Database(path)
  db.pragma('journal_mode = WAL')
  migrate(db)
  return db
}

/** Idempotent schema setup — safe to run on every boot. */
function migrate(d: Database.Database): void {
  d.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      email         TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at    INTEGER NOT NULL
    );
  `)
}
