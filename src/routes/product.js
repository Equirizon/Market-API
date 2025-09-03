const express = require('express')
const router = express.Router()
const controller = require('../controllers/productController.js')

router.get('/:id', controller.getProduct)
router.post('/', controller.addProduct)
router.get('/', controller.listProducts)

module.exports = router
