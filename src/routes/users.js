const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const { authenticateToken } = require('../auth/authTokenMiddleware.js')

// These commented routes should require admin privileges
// router.get('/', userController.getUsers)
// router.get('/:id', userController.getUserById)
router.get('/profile', authenticateToken, userController.getProfile)

module.exports = router
