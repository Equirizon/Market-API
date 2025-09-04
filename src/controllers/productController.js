const productModel = require("../db/database.js")

const productController = {
  async listProducts(req, res) {
    try {
      const products = await productModel.listProducts()
      res.json(products)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async getProduct(req, res) {
    const id = req.params.id
    try {
      const product = await productModel.getProduct(id)
      if (product) {
        res.json(product)
      } else {
        res.status(404).json({ error: 'Product not found' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async addProduct(req, res) {
    const { name, description, price } = req.body
    try {
      const result = await productModel.addProduct(name, description, price)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = productController