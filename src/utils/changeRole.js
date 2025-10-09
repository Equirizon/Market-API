/**
 * Changes the role of a user identified by either id or email.
 * @async
 * @param {Object} params - The parameters for identifying the user.
 * @param {number} [params.id] - The ID of the user.
 * @param {string} [params.email] - The email of the user.
 * @param {'user'|'admin'} role - The new role to assign to the user.
 * @throws {Error} If the role value is incorrect.
 * @throws {Error} If neither id nor email is provided.
 * @throws {Error} If the user is not found.
 * @returns {Promise<void>}
 */
const knex = require('../db/knex.js')
const logDev = require('./devLogging.js')

const changeRole = async ({ id, email }, role) => {
  if (role !== 'user' && role !== 'admin') throw new Error('Incorrect role value')
  let query = knex('users')
  if (id) query = query.where({ id })
  else if (email) query = query.where({ email })
  else throw new Error('Either id or email is required')
  const [user] = await query.update({ role }, ['role', 'name'])
  if (!user) throw new Error('User not found, try seeding the db with init_data first')
  logDev(`Set ${user.name}'s role to ${user.role}.`)
  return user.role
}

module.exports = changeRole
