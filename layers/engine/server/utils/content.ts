import type { SiteConfig, ThemeConfig } from '../../app/types/template'

/**
 * Content store. The site's content (SiteConfig) and theme (ThemeConfig) are
 * kept as two JSON documents in the `documents` table — the dashboard edits
 * them, the site renders from them. Storing whole documents (not normalized
 * rows) matches how the config is authored and edited: as a single tree.
 */

export function readDocument<T>(key: string): T | null {
  const row = getDb().prepare('SELECT value FROM documents WHERE key = ?').get(key) as
    { value: string } | undefined
  return row ? (JSON.parse(row.value) as T) : null
}

export function writeDocument(key: string, value: unknown): void {
  getDb()
    .prepare(
      `INSERT INTO documents (key, value, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    )
    .run(key, JSON.stringify(value), Date.now())
}

export function getContent(): { site: SiteConfig | null; theme: ThemeConfig | null } {
  return {
    site: readDocument<SiteConfig>('site'),
    theme: readDocument<ThemeConfig>('theme'),
  }
}

/**
 * First-boot seed. Each app calls this from a Nitro plugin with its own
 * build-time defaults (app/site/{config,theme}.ts) so a fresh deployment
 * starts with the template's content, then diverges as the dashboard edits it.
 */
export function seedContentIfEmpty(site: SiteConfig, theme: ThemeConfig): void {
  if (!readDocument('site')) writeDocument('site', site)
  if (!readDocument('theme')) writeDocument('theme', theme)
}
