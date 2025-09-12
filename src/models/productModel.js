const knex = require('../schema/productSchema.js')

// Product Model
const productModel = {
  async listProducts() {
    return await knex.select('*').from('products')
  },

  async getProduct(id) {
    return await knex.from('products').where('id', id).first()
  },

  async addProduct(name, description, price) {
    try {
      return await knex.from('products').insert({ name, description, price }, ['id', 'name'])
    } catch (error) {
      console.log(error.message)
      if (error.message.includes('UNIQUE constraint failed: products.name')) {
        throw new Error('Product with this name already exists.')
      }
      if (error.message.includes('NOT NULL constraint')) {
        throw new Error('Invalid product data.')
      }
    }
  },

  async updateProduct(id, name, description, price) {
    return await knex
      .from('products')
      .where('id', id)
      .update({ name, description, price }, ['name', 'description', 'price'])
  },

  async deleteProduct(id) {
    return await knex.from('products').where('id', id).del()
  },
}

module.exports = productModel
