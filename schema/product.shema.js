const z = require('zod')

const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  created_at: z.string(),
})

const AddProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number().optional(),
})

const UpdateProductSchema = AddProductSchema.partial()

module.exports = { ProductSchema, AddProductSchema, UpdateProductSchema, z }
