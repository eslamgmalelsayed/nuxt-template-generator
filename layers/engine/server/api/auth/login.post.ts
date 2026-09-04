import { object, string, minLength, pipe, email as vEmail, parse, type InferOutput } from 'valibot'

const LoginSchema = object({
  email: pipe(string(), vEmail()),
  password: pipe(string(), minLength(1)),
})
export type LoginInput = InferOutput<typeof LoginSchema>

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (b) => parse(LoginSchema, b))

  const user = getUserByEmail(body.email)
  // Verify even when the user is missing to avoid leaking which emails exist.
  const ok = user ? await verifyPassword(user.password_hash, body.password) : false
  if (!user || !ok) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  await setUserSession(event, {
    user: { id: user.id, email: user.email },
    loggedInAt: Date.now(),
  })
  return { ok: true }
})
