const authModel = require('./authModel.js')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken.js')
const logDev = require('../utils/devLogging.js')

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
      const result = await authModel.revokeRefreshToken(email)
      if (result) logDev('Old refresh token revoked on new login.')
      if (!user) {
        return res.status(401).json({ error: 'Email or Password is incorrect' })
      }
      bcrypt.compare(password, user.password, async (_err, result) => {
        if (result) {
          const userPayload = { name: user.name, email: user.email, id: user.id }
          const {
            token: accessToken,
            expiresOn: accessExpiresOn,
            expiresIn: accessExpiresIn,
          } = generateToken(userPayload, process.env.JWT_SECRET, process.env.TOKEN_EXPIRATION || '1h')
          const {
            token: refreshToken,
            expiresIn: refreshExpiresIn,
            expiresOn: refreshExpiresOn,
          } = generateToken(userPayload, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRATION || '1d')
          await authModel.saveRefreshToken(user.email, refreshToken, refreshExpiresOn)
          res.status(200).json({
            message: 'Login successful',
            accessToken,
            accessExpiresOn,
            accessExpiresIn,
            refreshToken,
            refreshExpiresOn,
            refreshExpiresIn,
          })
        } else {
          res.status(401).json({ error: 'Email or Password is incorrect' })
        }
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  // after authenticateRefreshToken Middleware
  async refreshToken(req, res) {
    try {
      const {
        body: { token: refreshToken },
        user: { name, email, id },
      } = req
      const refreshTokens = await authModel.getRefreshTokensFromDB(email)
      const activeRefreshToken = refreshTokens.find((token) => token.revoked === 0)
      const anyUnrevokedTokens = refreshTokens.map((token) => token.revoked).some((revoke) => revoke === 0)
      if (!anyUnrevokedTokens) return res.status(403).json({ error: 'Invalid refresh token, please login again' })
      if (activeRefreshToken?.refresh_token !== refreshToken) {
        return res.status(401).json({ error: 'Invalid refresh token' })
      }
      const { token: accessToken } = generateToken(
        { name, email, id },
        process.env.JWT_SECRET,
        process.env.TOKEN_EXPIRATION || '1h'
      )
      res.status(201).json({ message: 'Sucessfully refreshed access token.', newAccessToken: accessToken })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  async logout(req, res) {
    try {
      const { email } = req.user
      const result = await authModel.revokeRefreshToken(email)
      if (result) {
        logDev('Old refresh token revoked on new login.')
        return res.sendStatus(204)
      }
      res.sendStatus(418)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = authController
