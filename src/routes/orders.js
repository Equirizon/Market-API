const express = require('express')
const router = express.Router()
const { checkout, orders } = require('../controllers/ordersController.js')
const { authenticateToken } = require('../auth/middleware/authTokenMiddleware.js')

router.use(authenticateToken)

router.get('/', orders)
router.get('/checkout', checkout)

module.exports = router
