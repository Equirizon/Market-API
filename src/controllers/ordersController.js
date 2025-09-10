const ordersModel = require('../models/ordersModel.js')
const cartModel = require('../models/cartModel.js')

const ordersController = {
  async checkout(req, res) {
    const userId = req.params.id
    try {
      const cartItems = await cartModel.viewCart(userId)
      if (!cartItems.length) {
        return res.status(400).json({ error: 'Cart is empty' })
      }

      const totalCartValue = cartItems.reduce((sum, item) => sum + item.subtotal, 0)
      const result = await ordersModel.checkout(userId, totalCartValue)

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async orders(req, res) {
    const userId = req.params.id
    try {
      const orders = await ordersModel.orders(userId)
      if (!orders.length) {
        return res.status(404).json({ error: 'No orders found for this user' })
      }
      res.status(200).json(orders)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = ordersController
