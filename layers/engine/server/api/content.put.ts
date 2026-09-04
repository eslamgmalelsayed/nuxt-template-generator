import type { SiteConfig, ThemeConfig, Section } from '../../app/types/template'
import { sectionSchemas } from '../../app/admin/sectionSchemas'
import { themeSchema } from '../../app/admin/themeSchema'
import { siteSchema } from '../../app/admin/siteSchema'
import { cleanData, validateFields } from '../../app/admin/schemaUtils'

/**
 * Saves edited content and/or theme (dashboard → DB). Auth-protected.
 * Accepts a partial body: { site?, theme? }. Section data is validated and
 * pruned from the SAME schema registry the dashboard forms use, so the server
 * never trusts the client's shaping.
 */

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function assertSiteShape(v: unknown): asserts v is SiteConfig {
  if (
    !isObject(v) ||
    typeof v.key !== 'string' ||
    !isObject(v.brand) ||
    !Array.isArray(v.nav) ||
    !Array.isArray(v.sections) ||
    !isObject(v.seo) ||
    !isObject(v.organization)
  ) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid site content shape' })
  }
}

function assertThemeShape(v: unknown): asserts v is ThemeConfig {
  if (!isObject(v) || !isObject(v.light) || !isObject(v.dark)) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid theme shape' })
  }
}

/**
 * Validates + prunes a SiteConfig from the same schemas the dashboard uses:
 * site-level fields via siteSchema, each section via its sectionSchema. `key`
 * and `sections` are preserved through the site-level clean.
 */
function validateAndCleanSite(site: SiteConfig): SiteConfig {
  const errors: string[] = []

  const siteRecord = site as unknown as Record<string, unknown>
  for (const e of validateFields(siteSchema, siteRecord)) errors.push(e)

  const sections = site.sections.map((s: Section) => {
    const schema = sectionSchemas[s.component]
    if (!schema) return s
    const data = (s.data ?? {}) as Record<string, unknown>
    for (const e of validateFields(schema.fields, data)) errors.push(`${schema.label}: ${e}`)
    return { ...s, data: cleanData(schema.fields, data) }
  })

  if (errors.length) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: { errors },
    })
  }

  const cleanedTop = cleanData(siteSchema, siteRecord)
  return { ...site, ...cleanedTop, sections }
}

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const body = await readBody<{ site?: unknown; theme?: unknown }>(event)
  if (!isObject(body) || (body.site === undefined && body.theme === undefined)) {
    throw createError({ statusCode: 400, statusMessage: 'Provide site and/or theme' })
  }

  if (body.site !== undefined) {
    assertSiteShape(body.site)
    writeDocument('site', validateAndCleanSite(body.site))
  }
  if (body.theme !== undefined) {
    assertThemeShape(body.theme)
    const themeErrors = validateFields(
      themeSchema,
      body.theme as unknown as Record<string, unknown>,
    )
    if (themeErrors.length) {
      throw createError({
        statusCode: 422,
        statusMessage: 'Validation failed',
        data: { errors: themeErrors },
      })
    }
    writeDocument('theme', cleanData(themeSchema, body.theme as unknown as Record<string, unknown>))
  }

  return getContent()
})
