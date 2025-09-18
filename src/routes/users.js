const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../auth/middleware/authTokenMiddleware.js')

// These commented routes should require admin privileges
// router.get('/', userController.getUsers)
// router.get('/:id', userController.getUserById)
router.get('/profile', authMiddleware.authenticateToken, userController.getProfile)

module.exports = router
