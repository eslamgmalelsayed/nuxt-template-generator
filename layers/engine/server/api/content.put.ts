import type { SiteConfig, ThemeConfig } from '../../app/types/template'

/**
 * Saves edited content and/or theme (dashboard → DB). Auth-protected.
 * Accepts a partial body: { site?, theme? }.
 *
 * The engine is headless — the field-level schemas live in the client — so the
 * server validates STRUCTURE only (guards the store from corruption). The
 * dashboard does the per-field validation + pruning client-side before PUT.
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

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const body = await readBody<{ site?: unknown; theme?: unknown }>(event)
  if (!isObject(body) || (body.site === undefined && body.theme === undefined)) {
    throw createError({ statusCode: 400, statusMessage: 'Provide site and/or theme' })
  }

  if (body.site !== undefined) {
    assertSiteShape(body.site)
    writeDocument('site', body.site)
  }
  if (body.theme !== undefined) {
    assertThemeShape(body.theme)
    writeDocument('theme', body.theme)
  }

  return getContent()
})
