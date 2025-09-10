const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/ordersController.js')

router.get('/checkout/user/:id', ordersController.checkout)
router.get('/user/:id', ordersController.orders)

module.exports = router
