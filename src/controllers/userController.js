const userModel = require('../models/userModel.js')

const userController = {
  // getUsers, getUserById should require admin priviledges
  async getUsers(req, res) {
    try {
      const users = await userModel.getUsers()
      if (!users.length) {
        return res.status(404).json({ error: 'No users found' })
      }
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async getUserById(req, res) {
    const userId = req.params.id
    try {
      const user = await userModel.getUserById(userId)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async getProfile(req, res) {
    try {
      const { email } = req.user
      const user = await userModel.getUserByEmail(email)
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },
}

module.exports = userController
