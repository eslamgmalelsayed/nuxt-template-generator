import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppConfig, useState } from 'nuxt/app'
import type { Localized, LocaleCode, SiteConfig, ThemeConfig } from '../types/template'

type Content = { site: SiteConfig | null; theme: ThemeConfig | null }

/**
 * Exposes the active site's config + theme to engine components.
 *
 * Content is sourced from the DB (loaded once by the site-content plugin into
 * useState) so the dashboard can edit it at runtime. app.config.ts still holds
 * the build-time defaults — used to seed the DB, and as a safety fallback if the
 * content state is ever unavailable. Returns plain objects (a snapshot), so
 * components keep reading `config.x` / `theme.x` synchronously.
 *
 * `tl()` resolves a Localized value against the current locale.
 */
export function useSiteContent() {
  const content = useState<Content | null>('site-content', () => null)
  const appConfig = useAppConfig() as unknown as { site: SiteConfig; theme: ThemeConfig }

  const config = content.value?.site ?? appConfig.site
  const theme = content.value?.theme ?? appConfig.theme

  const { locale } = useI18n()

  const tl = (value?: Localized): string => {
    if (!value) return ''
    const code = locale.value as LocaleCode
    return value[code] ?? value.en ?? ''
  }

  return {
    config,
    theme,
    sections: computed(() => (config?.sections ?? []).filter((s) => s.enabled !== false)),
    tl,
  }
}
