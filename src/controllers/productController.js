const productModel = require('../models/productModel.js')
const { ProductSchema, AddProductSchema, UpdateProductSchema, z } = require('../../schema/product.shema.js')
const { isObject } = require('../utils/isObject.js')

const productController = {
  async listProducts(_req, res) {
    try {
      const products = await productModel.listProducts()
      if (!products.length) return res.status(404).json({ error: 'No products found' })
      const validatedProducts = products.map((product) => ProductSchema.parse(product))
      res.json(validatedProducts)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(500).send(z.prettifyError(error))
      }
      res.status(500).json({ error: error.message })
    }
  },

  async getProduct(req, res) {
    const id = req.params.id
    try {
      const product = await productModel.getProduct(id)
      if (product) {
        const validatedProduct = ProductSchema.parse(product)
        res.json(validatedProduct)
      } else {
        res.status(404).json({ error: 'Product does not exist' })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(500).send(z.prettifyError(error))
      }
      res.status(500).json({ error: error.message })
    }
  },

  // Fns below this should require elevated permissions
  async addProduct(req, res) {
    try {
      const { name, description, price } = AddProductSchema.parse(req.body)
      const [result] = await productModel.addProduct(name, description, price)
      res.status(201).json({ message: `Product ${result.name} added`, id: result.id })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send(z.prettifyError(error))
      }
      res.status(500).json({ error: error.message })
    }
  },

  async updateProduct(req, res) {
    const id = req.params.id
    try {
      if (isObject(req.body) && !Object.keys(req.body).length) {
        return res.status(400).json({ error: 'The query is empty!' })
      }
      const { name, description, price, stock } = UpdateProductSchema.parse(req.body)
      const [result] = await productModel.updateProduct(id, name, description, price, stock)
      if (result) {
        res.status(200).json({ message: `Product ${result.name} updated`, product: result })
      } else {
        res.status(404).json({ error: 'Product does not exist' })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send(z.prettifyError(error))
      }
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
