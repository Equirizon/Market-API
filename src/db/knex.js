const logDev = require('../utils/devLogging.js')

// Setup Knex
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3',
  },
  useNullAsDefault: true,
})

knex.raw('PRAGMA foreign_keys = ON').then(() => {
  logDev('Foreign keys enabled.')
})

module.exports = knex
// knex.js
