const z = require('zod')

const RegisterSchema = z.object({ username: z.string(), email: z.email(), password: z.string() })

const LoginSchema = z.strictObject({ email: z.email(), password: z.string() })

const UserPayloadSchema = z.strictObject({ name: z.string(), email: z.email(), id: z.number() })

// const jwtSchema = z.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
const JWTSchema = z.jwt()

const RefreshTokenSchema = z.object({
  token: JWTSchema,
})

module.exports = { RegisterSchema, LoginSchema, UserPayloadSchema, RefreshTokenSchema, z }
