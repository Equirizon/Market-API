const knex = require('../schema/productSchema.js')

// Product Model
const productModel = {
  async listProducts() {
    return await knex.select('*').from('products')
  },

  async getProduct(id) {
    return await knex.from('products').where({ id }).first()
  },

  async addProduct(name, description, price) {
    try {
      return await knex.from('products').insert({ name, description, price }, ['id', 'name'])
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed: products.name')) {
        throw new Error('Product with this name already exists.')
      }
      if (error.message.includes('NOT NULL constraint')) {
        throw new Error('Invalid product data.')
      }
      throw error
    }
  },

  async updateProduct(id, name, description, price, stock) {
    return await knex
      .from('products')
      .where({ id })
      .update({ name, description, price, stock }, ['name', 'description', 'price', 'stock'])
  },

  async deleteProduct(id) {
    return await knex.from('products').where({ id }).del()
  },

  async decrementStock(id, quantity) {
    return await knex('products')
      .where({ id })
      .decrement('stock', quantity)
      .returning('*')
  },
}

module.exports = productModel
