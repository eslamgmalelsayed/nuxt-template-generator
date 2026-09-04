/** Public read of the live site content + theme (source of truth for SSR). */
export default defineEventHandler(() => {
  return getContent()
})
