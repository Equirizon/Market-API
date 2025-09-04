const ordersModel = require('../models/ordersModel.js')

const ordersController = {
  async checkout(req, res) {
    const {userId, cartItems} = req.body
    try {
      if (!userId || !cartItems || !Array.isArray(cartItems)) {
        return res.status(400).json({error: 'Invalid request body'})
      }
      const result = await ordersModel.checkout(userId, cartItems)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  },
  async orders(req, res) {
    const userId = req.params.id
    try {
      const orders = await ordersModel.orders(userId)
      res.status(200).json(orders)
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  },
}

module.exports = ordersController
