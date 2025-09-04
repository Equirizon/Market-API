const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/ordersController.js')

router.post('/checkout', ordersController.checkout)
router.get('/:id/orders', ordersController.orders)

module.exports = router
