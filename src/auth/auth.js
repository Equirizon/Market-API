const express = require('express')
const router = express.Router()
const { register, login, logout, refreshToken } = require('./authController.js')
const { authenticateRefreshToken, authenticateToken } = require('./authTokenMiddleware.js')

router.post('/register', register)
router.post('/login', login)
router.post('/token', authenticateRefreshToken, refreshToken)
router.delete('/logout', authenticateToken, logout)

module.exports = router
