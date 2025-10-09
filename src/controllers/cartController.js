const cartModel = require('../models/cartModel.js')
const productModel = require('../models/productModel.js')
const { CartSchema, AddToCartSchema, z } = require('../../schema/cart.schema.js')
const { ProductSchema } = require('../../schema/product.shema.js')

const cartController = {
  async viewCart(req, res) {
    const user = req.user
    try {
      const cart = await cartModel.viewCart(user.id)
      if (!cart.length) {
        return res.status(404).json({ error: 'Cart is empty' })
      }

      const validatedCart = cart.map((cartItem) => CartSchema.parse(cartItem))
      res.status(200).json(validatedCart)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(500).send(z.prettifyError(error))
      }
      res.status(500).json({ error: error.message })
    }
  },

  async addToCart(req, res) {
    const user = req.user
    try {
      const { productId, quantity } = AddToCartSchema.parse(req.body)
      const product = await productModel.getProduct(productId)
      if (!product) return res.status(404).json({ error: 'Cannot find product' })
      let validatedProduct = null
      try {
        validatedProduct = ProductSchema.parse(product)
      } catch (error) {
        return res.status(500).send(z.prettifyError(error))
      }
      const [result] = await cartModel.addToCart(user.id, productId, quantity, validatedProduct.price)
      res.status(201).json({ message: `Item #${result.product_id} added to cart`, cartItem: result })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send(z.prettifyError(error))
      }
      res.status(500).json({ error: error.message })
    }
  },

  async deleteCartItem(req, res) {
    const itemId = req.params.id
    try {
      const result = await cartModel.deleteCartItem(itemId)
      if (result) {
        res.status(200).json({ message: 'Item removed from cart' })
      } else {
        res.status(404).json({ error: 'Item not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = cartController
// cartController.js
