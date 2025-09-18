const knex = require('../schema/ordersSchema.js')
require('../schema/orderItemsSchema.js')

const ordersModel = {
  // Checkout transaction
  async checkout(userId, totalAmount) {
    return await knex.transaction(async (trx) => {
      // 1. Insert into orders table
      const [orderId] = await trx('orders').insert({ user_id: userId, total_amount: totalAmount }).returning('id')

      // 2. Get cart items for the user
      const cartItems = await trx('cart').where({ user_id: userId }).select('*')

      // 3. Check stock
      await Promise.all(
        cartItems.map(async (item) => {
          const product = await trx('products').where({ id: item.product_id }).select('stock').first()
          if (product.stock - item.quantity < 0) {
            throw new Error('Insufficient stock for one or more products')
          }
        })
      )
      // 4. Decrement stock
      await Promise.all(
        cartItems.map(async (item) => {
          const product = await trx('products').where({ id: item.product_id }).select('stock').first()
          if (product.stock - item.quantity >= 0) {
            return await trx('products').where({ id: item.product_id }).decrement('stock', item.quantity)
          }
          throw new Error('Insufficient stock for one or more products')
        })
      )
      // 5. Insert into order_items table
      const orderItems = cartItems.map((item) => ({
        order_id: orderId.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.subtotal / item.quantity,
      }))
      await trx('order_items').insert(orderItems)

      // 6. Clear the user's cart
      await trx('cart').where({ user_id: userId }).del()

      return { orderId: orderId.id, message: 'Checkout successful' }
    })
  },

  async orders(userId) {
    return await knex.from('orders').where({ user_id: userId }).select('*')
  },
}

module.exports = ordersModel
