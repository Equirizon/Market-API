const express = require('express')
const router = express.Router()
const controller = require('../controllers/ordersController.js')

router.post('/checkout', controller.checkout)
router.get('/:userId/orders', controller.orders)

module.exports = router
