const userModel = require('../models/userModel.js')
const { userSchema, z } = require('../../schema/user.schema.js')

const userController = {
  // admin
  async getUsers(_req, res) {
    try {
      const users = await userModel.getUsers()
      if (!users.length) return res.status(404).json({ error: 'No users found' })
      const validateUsers = users.map((user) => userSchema.parse(user))
      res.status(200).json(validateUsers)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send(z.prettifyError(error))
      }
      res.status(500).json({ error: error.message })
    }
  },

  // admin's and user's own data
  async getProfile(req, res) {
    try {
      const { email } = req.user
      const user = await userModel.getUserByEmail(email)
      if (!user) return res.status(404).json({ error: 'User not found' })
      const validatedUser = userSchema.parse(user)
      res.status(200).json(validatedUser)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send(z.prettifyError(error))
      }
      res.status(400).json({ error: error.message })
    }
  },

  // async getUserById(req, res) {
  //   const userId = req.params.id
  //   try {
  //     const user = await userModel.getUserById(userId)
  //     if (!user) {
  //       return res.status(404).json({ error: 'User not found' })
  //     }
  //     res.status(200).json(user)
  //   } catch (err) {
  //     res.status(500).json({ error: err.message })
  //   }
  // },
}

module.exports = userController
