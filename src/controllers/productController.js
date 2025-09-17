const productModel = require('../models/productModel.js')

const productController = {
  async listProducts(_req, res) {
    try {
      const products = await productModel.listProducts()
      if (!products.length) {
        return res.status(404).json({ error: 'No products found' })
      }
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
        res.status(404).json({ error: 'Product does not exist' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Fns below this should require elevated permissions
  async addProduct(req, res) {
    const { name, description, price } = req.body
    try {
      const [result] = await productModel.addProduct(name, description, price)
      res.status(201).json({ message: `Product ${result.name} added`, id: result.id })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async updateProduct(req, res) {
    const id = req.params.id
    const { name, description, price, stock } = req.body
    try {
      const [result] = await productModel.updateProduct(id, name, description, price, stock)
      if (result) {
        res.status(200).json({ message: `Product ${result.name} updated`, product: result })
      } else {
        res.status(404).json({ error: 'Product does not exist' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async deleteProduct(req, res) {
    const id = req.params.id
    try {
      const result = await productModel.deleteProduct(id)
      if (result) {
        res.json({ message: `Product deleted successfully` })
      } else {
        res.status(404).json({ error: 'Product does not exist' })
      }
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = productController
