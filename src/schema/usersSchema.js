const knex = require('../db/knex.js')

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
      console.info('Users table already exists.')
    }
  })
}

createUsersTable()

const changeRole = async (id, role) => {
  if (!id) throw new Error('ID is required')
  if (role !== 'user' && role !== 'admin') throw new Error('Incorrect role value')
  const [user] = await knex('users').where({ id }).update({ role }, ['role', 'name'])
  if (!user) throw new Error('User not found')
  console.info(`Set ${user.name}'s role to ${user.role}.`)
}

changeRole(1, 'admin')

// if (process.env.DEV === 'true') {
//   knex.schema
//     .dropTableIfExists('users')
//     .then(() => {
//       console.info('Users table dropped.')
//     })
//     .catch((err) => {
//       console.error({ type: 'error', message: 'Error dropping users table: ' + err.message })
//     })
//     .finally(createUsersTable)
// } else {
//   createUsersTable()
// }

module.exports = knex
