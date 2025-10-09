const knex = require('../../db/knex.js')
const logDev = require('../../utils/devLogging.js')

// used after authenticateToken middleware
const roleMiddleware = async (req, res, next) => {
  const { email } = req.user
  const user = await knex.from('users').where({ email }).first()
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Request requires admin privileges' })
  }
  try {
    logDev(`Admin ${user.name} request accepted.`)
  } catch (error) {
    console.error(error.message)
  }
  next()
}

module.exports = { roleMiddleware }
