const cartModel = require('../models/cartModel.js')

const cartController = {
  async viewCart(_req, res) {
    try {
      const cart = await cartModel.viewCart()
      if (!cart.length) {
        return res.status(404).json({ error: 'Cart is empty' })
      }
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async addToCart(req, res) {
    const { userId, productId, quantity } = req.body
    try {
      const [result] = await cartModel.addToCart(userId, productId, quantity)
      res.status(201).json({ message: `Item #${result.product_id} added to cart`, cartItem: result })
    } catch (error) {
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
        res.status(404).json({ error: 'Item does not exist' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = cartController
// cartController.js
