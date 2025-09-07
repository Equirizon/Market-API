const knex = require('../db/knex.js')

// Create users table if it doesn't exist
knex.schema.hasTable('users').then((exists) => {
  if (!exists) {
    return knex.schema
      .createTable('users', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').unique().notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
      })
      .then(() => {
        console.info('Users table created.')
      })
      .catch((err) => {
        console.error({type: 'error', message: 'Error creating users table: ' + err.message})
      })
  } else {
    console.info('Users table already exists.')
  }
})

// User Model
const userModel = {
  async getUsers() {
    return knex('users')
      .select('*')
      .then((rows) => {
        return rows
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  async getUserById(id) {
    return knex('users')
      .where('id', id)
      .first()
      .then((row) => {
        return row
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  async createUser(name, email) {
    return knex('users').insert({name, email}).then(([id]) => {
      return this.getUserById(id)
    }).catch((err) => {
      return Promise.reject(err)
    })
  },

  async getUserByEmail(email) {
    return knex('users')
      .where('email', email)
      .first()
      .then((row) => {
        return row
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

}

module.exports = userModel
