import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppConfig } from 'nuxt/app'
import type { Localized, LocaleCode, SiteConfig, ThemeConfig } from '../types/template'

/**
 * Exposes the active site's config + theme to engine components.
 *
 * Each app (consumer of the @strata/engine layer) provides its content via
 * `app.config.ts` → `{ site, theme }`. The engine never imports app content
 * directly, which is what makes it reusable across every business template.
 *
 * `tl()` resolves a Localized value against the current locale.
 */
export function useSiteConfig() {
  const appConfig = useAppConfig() as unknown as { site: SiteConfig; theme: ThemeConfig }
  const config = appConfig.site
  const theme = appConfig.theme

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
