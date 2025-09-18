const knex = require('../schema/usersSchema.js')
require('./schema/refreshTokensSchema.js')

// Auth Model
const authModel = {
  async registerUser(name, email, password) {
    try {
      return await knex('users').insert({ name, email, password }, ['id', 'name', 'email'])
    } catch (err) {
      console.log(err)
      if (err.message.includes('SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email')) {
        throw new Error('Email already been used.')
      }
    }
  },

  async getUserByEmail(email) {
    return await knex('users').where({ email }).first()
  },

  async saveRefreshToken(email, refreshToken, expiresOn) {
    return await knex('refresh_tokens').insert({ email, refresh_token: refreshToken, expires_on: expiresOn }, ['email', 'refresh_token', 'expires_on'])
  },

  async getRefreshToken(email) {
    return await knex('refresh_tokens').where({ email }).first()
  },

  async removeRefreshToken(email) {
    return await knex('refresh_tokens').where({ email }).del()
  }
}

module.exports = authModel
