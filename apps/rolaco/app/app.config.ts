import { rolacoConfig } from './site/config'
import { rolacoTheme } from './site/theme'

// Provides this site's content + theme to the @strata/engine layer.
export default defineAppConfig({
  site: rolacoConfig,
  theme: rolacoTheme,
})
