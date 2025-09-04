const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController.js')

router.post('/', cartController.addToCart)
router.get('/:id', cartController.viewCart)
router.delete('/:id', cartController.deleteCartItem)

module.exports = router
