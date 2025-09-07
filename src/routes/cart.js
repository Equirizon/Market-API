const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController.js')

router.get('/', cartController.viewCart)
router.post('/', cartController.addToCart)
router.delete('/:id', cartController.deleteCartItem)

module.exports = router
