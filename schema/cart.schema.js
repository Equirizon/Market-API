const z = require('zod')

const CartSchema = z.strictObject({
  id: z.number(),
  user_id: z.number(),
  product_id: z.number(),
  product_price: z.number(),
  subtotal: z.number(),
  quantity: z.number(),
  added_at: z.string(),
})

const AddToCartSchema = z.strictObject({ productId: z.number(), quantity: z.number() })

module.exports = { CartSchema, AddToCartSchema, z }
