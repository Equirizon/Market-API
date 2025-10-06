const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.status(401).send('User needs to be logged in')
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, userPayload) => {
    if (err) return res.status(403).send('Token is invalid or expired')
    req.user = userPayload
    next()
  })
}

const authenticateRefreshToken = (req, res, next) => {
  const refreshToken = req.body.token
  if (!refreshToken) return res.sendStatus(401)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userPayload) => {
    if (err) return res.sendStatus(403)
    req.user = userPayload
    next()
  })
}

module.exports = { authenticateToken, authenticateRefreshToken }
