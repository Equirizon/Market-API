const knex = require('../db/knex.js')

knex.schema
  .dropTableIfExists('cart')
  .then(() => {
    console.info('Cart table dropped.')
  })
  .catch((err) => {
    console.error({ type: 'error', message: 'Error dropping cart table: ' + err.message })
  })
  .finally(() => {
    knex.schema.hasTable('cart').then((exists) => {
      if (!exists) {
        return knex.schema
          .createTable('cart', function (table) {
            table.increments('id').primary()
            
            table.integer('user_id').unsigned().notNullable()
            table.foreign('user_id').references('users.id').onDelete('CASCADE')

            table.integer('product_id').unsigned().notNullable()
            table.foreign('product_id').references('products.id').onDelete('CASCADE')

            table.integer('quantity').notNullable()
            table.timestamp('added_at').defaultTo(knex.fn.now())
          })
          .then(() => {
            console.info('Cart table created.')
          })
          .catch((err) => {
            console.error({ type: 'error', message: 'Error creating cart table: ' + err.message })
          })
      } else {
        console.info('Cart table already exists.')
      }
    })
  })

module.exports = knex
