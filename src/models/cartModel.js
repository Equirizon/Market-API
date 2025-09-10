const knex = require('../schema/cartSchema.js')

const cart = {
  async viewCart() {
    return await knex.from('cart').select('*')
  },

  async addToCart(userId, productId, quantity, productPrice) {
    try {
      return await knex
        .from('cart')
        .insert({ user_id: userId, product_id: productId, quantity, product_price: productPrice }, [
          'id',
          'product_id',
          'quantity',
          'product_price',
        ])
        .then((rows) => {
          const insertedRow = rows[0]
          const subtotal = (insertedRow.quantity * insertedRow.product_price).toFixed(2)

          return knex
            .from('cart')
            .where('id', insertedRow.id)
            .update({ subtotal }, ['id', 'product_id', 'quantity', 'product_price', 'subtotal'])
        })
    } catch (error) {
      // console.log(error)
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new Error('Invalid user ID or product ID.')
      }
      throw error
    }
  },

  async deleteCartItem(id) {
    return await knex.from('cart').where('id', id).del()
  },
}

module.exports = cart
