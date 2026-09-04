import { starterConfig } from './site/config'
import { starterTheme } from './site/theme'
import { sectionSchemas } from './schemas/sectionSchemas'
import { siteSchema } from './schemas/siteSchema'
import { themeSchema } from './schemas/themeSchema'

// A client registers its content + theme AND the schemas that describe them.
// The engine is headless: the dashboard builds its forms from these schemas.
export default defineAppConfig({
  site: starterConfig,
  theme: starterTheme,
  schemas: {
    sections: sectionSchemas,
    site: siteSchema,
    theme: themeSchema,
  },
})
