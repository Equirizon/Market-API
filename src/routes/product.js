const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController.js')

router.get('/', productController.listProducts)
router.get('/:id', productController.getProduct)
router.post('/', productController.addProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router
