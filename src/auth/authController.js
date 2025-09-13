const authModel = require('./authModel.js')
const bcrypt = require('bcrypt')
const signJWT = require('../utils/signJWT.js')

const authController = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const [result] = await authModel.registerUser(username, email, hashedPassword)
      res
        .status(201)
        .json({ id: result.id, name: result.name, email: result.email, message: 'User registered successfully' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await authModel.getUserByEmail(email)
      if (!user) {
        return res.status(401).json({ error: 'Email or Password is incorrect' })
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const { token, expiresOn, expiresIn } = signJWT(
            { name: user.name, email: user.email },
            process.env.TOKEN_EXPIRATION || '1h',
            process.env.JWT_SECRET
          )
          res.status(200).json({ message: 'Login successful', token, expiresOn, expiresIn })
        } else {
          res.status(401).json({ error: 'Email or Password is incorrect' })
        }
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
}

module.exports = authController
