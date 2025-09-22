const ordersModel = require('../models/ordersModel.js')
const cartModel = require('../models/cartModel.js')

const ordersController = {
  async orders(req, res) {
    const user = req.user
    try {
      const orders = await ordersModel.orders(user.id)
      if (!orders.length) {
        return res.status(404).json({ error: 'No orders found for this user' })
      }
      res.status(200).json(orders)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
  async checkout(req, res) {
    const user = req.user
    try {
      const cartItems = await cartModel.viewCart(user.id)
      if (!cartItems.length) {
        return res.status(400).json({ error: 'Cart is empty' })
      }
      const totalCartValue = cartItems.reduce((sum, item) => sum + item.subtotal, 0)
      const result = await ordersModel.checkout(user.id, totalCartValue)
      res.status(200).json(result)
    } catch (error) {
      const insufficientStock = error.message.includes('Insufficient')
      res.status(insufficientStock ? 400 : 500).json({ error: error.message })
    }
  },
}

module.exports = ordersController
