const express = require('express')
const router = express.Router()
const controller = require('../controllers/cartController.js')

router.post('/', controller.addToCart)
router.get('/:id', controller.viewCart)
router.delete('/:id', controller.deleteCartItem)

module.exports = router
