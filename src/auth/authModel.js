const knex = require('../db/knex.js')

// Auth Model
const authModel = {
  async registerUser(name, email, password) {
    try {
      return await knex('users').insert({ name, email, password }, ['id', 'name', 'email'])
    } catch (error) {
      if (error.message.includes('SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email')) {
        throw new Error('Email already been used')
      }
      throw error
    }
  },

  async getUserByEmail(email) {
    return await knex('users').where({ email }).first()
  },

  async saveRefreshToken(email, refreshToken, expiresOn) {
    return await knex('refresh_tokens').insert({ email, refresh_token: refreshToken, expires_on: expiresOn }, [
      'email',
      'refresh_token',
      'expires_on',
    ])
  },

  async getRefreshTokensFromDB(email) {
    return await knex('refresh_tokens').where({ email }).select('*')
  },

  async revokeRefreshToken(email) {
    return await knex('refresh_tokens').where({ email, revoked: false }).update({ revoked: true })
  },
}

module.exports = authModel
