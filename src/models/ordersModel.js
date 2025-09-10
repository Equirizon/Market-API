const knex = require('../schema/ordersSchema.js')
require('../schema/orderItemsSchema.js')

const ordersModel = {
  async checkout(userId, totalAmount) {
    try {
      return await knex.transaction(async (trx) => {
        const [orderId] = await trx('orders')
          .insert({ user_id: userId, total_amount: totalAmount })
          .returning('id')

        const cartItems = await trx('cart').where({ user_id: userId }).select('*')

        
        const orderItems = cartItems.map((item) => ({
          order_id: orderId.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.subtotal / item.quantity,
        }))
        
        console.log(orderItems)
        await trx('order_items').insert(orderItems)

        await trx('cart').where({ user_id: userId }).del()

        return { orderId: orderId.id, message: 'Checkout successful' }
      })
    } catch (error) {
      throw error
    }
  },

  async orders(userId) {
    return await knex.from('orders').where({ user_id: userId }).select('*')
  },
}

module.exports = ordersModel
