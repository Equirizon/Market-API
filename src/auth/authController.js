const jwt = require('jsonwebtoken')
const authModel = require('./authModel.js')
const bcrypt = require('bcrypt')
const ms = require('ms')

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
          const expirationTime = process.env.TOKEN_EXPIRATION || '1h'
          const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: expirationTime })
          const decoded = jwt.decode(token)
          const expTimestamp = decoded && decoded.exp ? decoded.exp * 1000 : Date.now() + ms(expirationTime)
          const expiryDateString = new Date(expTimestamp).toLocaleDateString()
          const localExpiryTime = new Date(expTimestamp).toLocaleTimeString('it-IT')
          const expiresOn = `${expiryDateString} at ${localExpiryTime}`
          res.status(200).json({ message: 'Login successful', token, expiresOn, expiresIn: expirationTime })
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
