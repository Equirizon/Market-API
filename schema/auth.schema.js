const z = require('zod')

const registerSchema = z.object({ username: z.string(), email: z.email(), password: z.string() })

const loginSchema = z.strictObject({ email: z.email(), password: z.string() })

const userPayloadSchema = z.strictObject({ name: z.string(), email: z.email(), id: z.number() })

const jwtSchema = z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)

const refreshTokenSchema = z.object({
  token: jwtSchema,
})

module.exports = { registerSchema, loginSchema, userPayloadSchema, refreshTokenSchema, z }
