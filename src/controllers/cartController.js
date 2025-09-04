const cartModel = require('../models/cartModel.js')

const cartController = {
  async addToCart(req, res) {
    const {userId, productId, quantity} = req.body
    try {
      const result = await cartModel.addToCart(userId, productId, quantity)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  },
  
  async viewCart(req, res) {
    const userId = req.params.id
    try {
      const cart = await cartModel.viewCart(userId)
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  },

  async deleteCartItem(req, res) {
    const itemId = req.params.id
    try {
      const result = await cartModel.deleteCartItem(itemId)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  },
}

module.exports = cartController
// cartController.js
