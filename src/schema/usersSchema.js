const knex = require('../db/knex.js')
const changeRole = require('../utils/changeRole.js')

const createUsersTable = () => {
  knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable('users', function (table) {
          table.increments('id').primary()
          table.string('name').notNullable()
          table.string('email').unique().notNullable()
          table.string('password').notNullable()
          table.enu('role', ['user', 'admin']).defaultTo('user').notNullable()
          table.timestamp('created_at').defaultTo(knex.fn.now())
        })
        .then(() => {
          console.info('Users table created.')
        })
        .catch((err) => {
          console.error({ type: 'error', message: 'Error creating users table: ' + err.message })
        })
    } else {
      if (process.env.DEV === 'true') return console.info('Users table already exists.')
    }
  })
}

// createUsersTable()
// changeRole(1, 'admin')

if (process.env.DEV === 'true') {
  knex.schema
    .dropTableIfExists('users')
    .then(() => {
      console.info('Users table dropped.')
    })
    .catch((err) => {
      console.error({ type: 'error', message: 'Error dropping users table: ' + err.message })
    })
    .finally(createUsersTable)
} else {
  createUsersTable()
}

module.exports = knex
