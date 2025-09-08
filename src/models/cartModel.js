const knex = require('../schema/cartSchema.js')

const cart = {
  async viewCart() {
    return knex.from('cart').select('*')
  },

  async addToCart(userId, productId, quantity) {
    return knex.from('cart').insert({ user_id: userId, product_id: productId, quantity }, ['id', 'product_id', 'quantity'])
  },

  async deleteCartItem(id) {
    return knex.from('cart').where('id', id).del()
  },
}

module.exports = cart
