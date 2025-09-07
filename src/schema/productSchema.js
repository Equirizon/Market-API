const knex = require('../db/knex.js')

// Create products table if it doesn't exist
knex.schema.hasTable('products').then((exists) => {
  if (!exists) {
    return knex.schema
      .createTable('products', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.text('description')
        table.decimal('price', 10, 2).notNullable()
        table.integer('stock').defaultTo(0)
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
      .then(() => {
        console.info('Products table created.')
      })
      .catch((err) => {
        console.error({ type: 'error', message: 'Error creating products table: ' + err.message })
      })
  } else {
    console.info('Products table already exists.')
  }
})

// knex.schema
//   .dropTable('products')
//   .then(() => {
//     console.info('Products table dropped')
//   })
//   .catch((err) => {
//     console.error({ type: 'error', message: 'Error dropping products table: ' + err.message })
//   })
//   .finally(() => {
//     knex.schema.hasTable('products').then((exists) => {
//       if (!exists) {
//         return knex.schema
//           .createTable('products', (table) => {
//             table.increments('id').primary()
//             table.string('name').notNullable().unique()
//             table.text('description')
//             table.decimal('price', 10, 2).notNullable()
//             table.integer('stock').defaultTo(0)
//             table.timestamp('created_at').defaultTo(knex.fn.now())
//           })
//           .then(() => {
//             console.info('Products table created.')
//           })
//           .catch((err) => {
//             console.error({ type: 'error', message: 'Error creating products table: ' + err.message })
//           })
//       } else {
//         console.info('Products table already exists.')
//       }
//     })
//   })

module.exports = knex