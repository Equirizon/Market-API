const express = require('express')
const router = express.Router()
const { viewCart, addToCart, deleteCartItem } = require('../controllers/cartController.js')
const { authenticateToken } = require('../auth/middleware/authTokenMiddleware.js')

router.use(authenticateToken)

// private routes
router.get('/', viewCart)
router.post('/', addToCart)
router.delete('/:id', deleteCartItem)

module.exports = router
