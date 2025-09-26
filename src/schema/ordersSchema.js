const knex = require('../db/knex.js')

const createOrdersTable = () => {
  knex.schema.hasTable('orders').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('orders', function (table) {
          table.increments('id').primary()

          table.integer('user_id').unsigned().notNullable()
          table.foreign('user_id').references('users.id').onDelete('CASCADE')

          table.decimal('total_amount', 10, 2).notNullable()
          table.timestamp('created_at').defaultTo(knex.fn.now())
        })
        .then(() => {
          console.info('Orders table created.')
        })
        .catch((err) => {
          console.error({ type: 'error', message: 'Error creating orders table: ' + err.message })
        })
    } else {
      if (process.env.DEV === 'true') return console.info('Orders table already exists.')
    }
  })
}

if (process.env.DEV === 'true') {
  knex.schema
    .dropTableIfExists('orders')
    .then(() => {
      console.info('Orders table dropped.')
    })
    .catch((err) => {
      console.error({ type: 'error', message: 'Error dropping orders table: ' + err.message })
    })
    .finally(createOrdersTable)
} else {
  createOrdersTable()
}

module.exports = knex
