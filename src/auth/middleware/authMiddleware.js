const knex = require('../../schema/usersSchema.js')

const roleMiddleware = async (req, res, next) => {
  const { email } = req.user
  const user = await knex.from('users').where({ email }).first()
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Request requires admin privileges' })
  }
  console.info(`Admin ${user.name} request accepted.`)
  next()
}

module.exports = { roleMiddleware }
