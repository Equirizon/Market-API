const z = require('zod')

const userSchema = z.strictObject({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  role: z.enum(['user', 'admin']),
  created_at: z.string(),
})

module.exports = { userSchema, z }
