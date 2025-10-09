const knex = require('../db/knex.js')

// User Model
const userModel = {
  async getUsers() {
    return await knex.from('users').select('id', 'name', 'email', 'role', 'created_at')
  },

  async getUserById(id) {
    return await knex.from('users').where({ id }).select('id', 'name', 'email', 'role', 'created_at').first()
  },

  async getUserByEmail(email) {
    return await knex.from('users').where({ email }).select('id', 'name', 'email', 'role', 'created_at').first()
  },
}

module.exports = userModel
