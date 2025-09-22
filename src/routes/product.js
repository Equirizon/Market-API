const express = require('express')
const router = express.Router()
const {
  listProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController.js')
const { authenticateToken } = require('../auth/middleware/authTokenMiddleware.js')
const { roleMiddleware } = require('../auth/middleware/authMiddleware.js')


// Public routes
router.get('/', listProducts)
router.get('/:id', getProduct)

router.use(authenticateToken)
router.use(roleMiddleware)

// Protected routes (admin only)
router.post('/', addProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router
