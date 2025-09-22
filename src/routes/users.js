const express = require('express')
const router = express.Router()
const { getUsers, getProfile } = require('../controllers/userController.js')
const { authenticateToken } = require('../auth/middleware/authTokenMiddleware.js')
const { roleMiddleware } = require('../auth/middleware/authMiddleware.js')

router.use(authenticateToken)

// Some routes should require admin privileges
router.get('/', roleMiddleware, getUsers)
router.get('/profile', getProfile)

// router.get('/:id', authMiddleware, userController.getUserById)

module.exports = router
