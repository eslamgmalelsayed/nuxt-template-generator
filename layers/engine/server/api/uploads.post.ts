import { randomBytes } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

/**
 * Image upload (dashboard only). Writes to the uploads volume and returns the
 * public path (served by routes/uploads/[...path].get.ts). Files are renamed to
 * an opaque token, so the original filename can't be used for traversal.
 */
const ALLOWED: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
}
const MAX_BYTES = 5 * 1024 * 1024

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const parts = await readMultipartFormData(event)
  const file = parts?.find((p) => p.name === 'file' && p.filename)
  if (!file) throw createError({ statusCode: 400, statusMessage: 'No file provided' })

  const ext = ALLOWED[file.type ?? '']
  if (!ext) throw createError({ statusCode: 415, statusMessage: 'Unsupported image type' })
  if (file.data.length > MAX_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Image too large (max 5MB)' })
  }

  const dir = resolve(process.cwd(), useRuntimeConfig().uploadsDir || './data/uploads')
  await mkdir(dir, { recursive: true })

  const name = `${Date.now()}-${randomBytes(4).toString('hex')}.${ext}`
  await writeFile(resolve(dir, name), file.data)

  return { path: `/uploads/${name}` }
})
