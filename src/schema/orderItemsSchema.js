const knex = require('../db/knex.js')

const createOrderItemsTable = async () => {
  knex.schema.hasTable('order_items').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('order_items', (table) => {
          table.increments('id').primary()
          
          table.integer('order_id').unsigned().notNullable()
          table.foreign('order_id').references('orders.id').onDelete('CASCADE')

          table.integer('product_id').unsigned().notNullable()
          table.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE')

          table.integer('quantity').notNullable()
          table.decimal('price', 10, 2).notNullable()
          table.timestamps(true, true)
        })
        .then(() => {
          console.info('Order items table created.')
        })
        .catch((err) => {
          console.error({ type: 'error', message: 'Error creating order items table: ' + err.message })
        })
    } else {
      console.info('Order items table already exists')
    }
  })
}

if (process.env.DEV === 'true') {
  knex.schema
    .dropTableIfExists('order_items')
    .then(() => {
      console.info('Order items table dropped.')
    })
    .catch((err) => {
      console.error({ type: 'error', message: 'Error dropping order items table: ' + err.message })
    })
    .finally(createOrderItemsTable)
} else {
  createOrderItemsTable()
}

module.exports = knex
