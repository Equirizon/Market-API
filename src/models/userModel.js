const knex = require('../schema/usersSchema.js')

// User Model
const userModel = {
  async getUsers() {
    return await knex.from('users').select('*')
  },

  async getUserById(id) {
    return await knex.from('users').where({ id }).first()
  },

  async getUserByEmail(email) {
    return await knex.from('users').where({ email }).first()
  },
}

module.exports = userModel
