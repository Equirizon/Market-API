const userModel = require("../models/userModel.js")

const userController = {
  async getUsers(req, res) {
    try {
      const users = await userModel.getUsers()
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

  async createUser(req, res) {
    const { name, email } = req.body
    try {
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' })
      }
      const existingUser = await userModel.getUserByEmail(email)
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' })
      }
      const newUser = await userModel.createUser(name, email)
      res.status(201).json(newUser)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}

module.exports = userController
