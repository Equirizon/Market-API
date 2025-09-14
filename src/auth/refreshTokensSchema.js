const knex = require('../db/knex.js')

const createRefreshTokensTable = () => {
  knex.schema.hasTable('refresh_tokens').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('refresh_tokens', (table) => {
          table.increments('id').primary
          table.string('refresh_token').unique().notNullable()

          table.string('email').unique().notNullable()
          table.foreign('email').references('users.email').onDelete('CASCADE').onUpdate('CASCADE')

          table.timestamp('created_at').defaultTo(knex.fn.now())
          table.timestamp('expires_on').notNullable()
        })
        .then(() => {
          console.info('Refresh Tokens table created.')
        })
        .catch((error) => {
          console.error({ type: 'error', message: 'Error creating refresh_tokens table' + error.message })
        })
    } else {
      console.info('Refresh Tokens table already exists.')
    }
  })
}

if (process.env.DEV === 'true') {
  knex.schema
    .dropTableIfExists('refresh_tokens')
    .then(() => {
      console.info('Refresh Tokens table dropped.')
    })
    .catch((error) => {
      console.error({ type: 'error', message: 'Error dropping refresh_tokens table' + error.message })
    })
    .finally(createRefreshTokensTable)
} else {
  createRefreshTokensTable()
}

module.exports = knex
