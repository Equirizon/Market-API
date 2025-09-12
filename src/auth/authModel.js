const knex = require('../schema/usersSchema.js')

// Auth Model
const authModel = {
  async registerUser(name, email, password) {
    try {
      return await knex('users').insert({ name, email, password }, ['id', 'name', 'email'])
    } catch (err) {
      console.log(err)
      if (err.message.includes('SQLITE_CONSTRAINT: UNIQUE constraint failed')) {
        throw new Error('Email already been used.')
      }
    }
  },

  async getUserByEmail(email) {
    return await knex('users').where({ email }).first()
  },
}

module.exports = authModel
