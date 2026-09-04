import { createReadStream, existsSync, statSync } from 'node:fs'
import { resolve, sep, extname } from 'node:path'

/**
 * Serves uploaded images from the uploads volume (public — these are site
 * assets). Kept out of the baked public/ dir so uploads persist on the volume
 * across deploys. Resolves inside the uploads dir to block path traversal.
 */
const MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  avif: 'image/avif',
}

export default defineEventHandler((event) => {
  const rel = getRouterParam(event, 'path') || ''
  const dir = resolve(process.cwd(), useRuntimeConfig().uploadsDir || './data/uploads')
  const target = resolve(dir, rel)

  if (target !== dir && !target.startsWith(dir + sep)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid path' })
  }
  if (!existsSync(target) || !statSync(target).isFile()) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const ext = extname(target).slice(1).toLowerCase()
  setHeader(event, 'Content-Type', MIME[ext] || 'application/octet-stream')
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  return sendStream(event, createReadStream(target))
})
