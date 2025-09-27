const knex = require('../db/knex.js')
const logDev = require('../utils/devLogging.js')

const createProductsTable = () => {
  // Create products table if it doesn't exist
  knex.schema.hasTable('products').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('products', function (table) {
          table.increments('id').primary()
          table.string('name').notNullable().unique()
          table.text('description')
          table.decimal('price', 10, 2).notNullable().unsigned()
          table.integer('stock').defaultTo(0).unsigned()
          table.timestamp('created_at').defaultTo(knex.fn.now())
        })
        .then(() => {
          console.info('Products table created.')
        })
        .catch((err) => {
          console.error({ type: 'error', message: 'Error creating products table: ' + err.message })
        })
    } else {
      logDev('Products table already exists.')
    }
  })
}

// Uncomment the following block to drop and recreate the products table
// Useful during development to reset the schema

// createProductsTable()

if (process.env.DEV === 'true') {
  knex.schema
    .dropTableIfExists('products')
    .then(() => {
      console.info('Products table dropped')
    })
    .catch((err) => {
      console.error({ type: 'error', message: 'Error dropping products table: ' + err.message })
    })
    .finally(createProductsTable)
} else {
  createProductsTable()
}


module.exports = knex
