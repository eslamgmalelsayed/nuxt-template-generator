import { starterConfig } from '../../app/site/config'
import { starterTheme } from '../../app/site/theme'

/**
 * Seeds the DB from this template's build-time content on first boot only.
 * The engine owns the store (seedContentIfEmpty, auto-imported); the app owns
 * the data. After the first boot the dashboard is the source of truth and these
 * defaults are ignored.
 */
export default defineNitroPlugin(() => {
  seedContentIfEmpty(starterConfig, starterTheme)
})
