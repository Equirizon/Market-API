const jwt = require('jsonwebtoken')
const ms = require('ms')

const signJWT = (payload, expiresIn, secret) => {
  const expirationTime = expiresIn || '1h'
  const token = jwt.sign(payload, secret, { expiresIn: expirationTime })
  const decoded = jwt.decode(token)
  const expTimestamp = decoded && decoded.exp ? decoded.exp * 1000 : Date.now() + ms(expirationTime)
  const expiryDateString = new Date(expTimestamp).toLocaleDateString()
  const localExpiryTime = new Date(expTimestamp).toLocaleTimeString('it-IT')
  const expiresOn = `${expiryDateString} at ${localExpiryTime}`

  return { token, expiresOn, expiresIn: expirationTime }
}

module.exports = signJWT
