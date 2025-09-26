const knex = require('../db/knex.js')

const changeRole = async (id, role) => {
  if (!id) throw new Error('ID is required')
  if (role !== 'user' && role !== 'admin') throw new Error('Incorrect role value')
  const [user] = await knex('users').where({ id }).update({ role }, ['role', 'name'])
  if (!user) throw new Error('User not found')
  console.info(`Set ${user.name}'s role to ${user.role}.`)
}

module.exports = changeRole