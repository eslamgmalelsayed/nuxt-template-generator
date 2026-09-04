import { useAppConfig } from 'nuxt/app'
import type { DashboardSchemas } from '../types/schema'

/**
 * The content model the client registers via app.config. The engine is
 * headless — it ships no schemas — so the dashboard reads them from here to
 * generate its forms. Falls back to empty so the dashboard degrades gracefully
 * if a client forgets to provide them.
 */
export function useSchemas(): DashboardSchemas {
  const appConfig = useAppConfig() as unknown as { schemas?: DashboardSchemas }
  return appConfig.schemas ?? { sections: {}, site: [], theme: [] }
}
