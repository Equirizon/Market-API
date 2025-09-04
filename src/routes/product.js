const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController.js')

router.get('/', productController.listProducts) 
router.get('/:id', productController.getProduct)
router.post('/', productController.addProduct)

module.exports = router
