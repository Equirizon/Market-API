/**
 * @openapi
 * /api/v1/orders:
 *   get:
 *     tags:
 *       - Orders
 *     description: Get all orders for the authenticated user
 *     responses:
 *       200:
 *         description: Returns a list of orders.
 *       401:
 *         description: Unauthorized. Authentication is required.
 *       403:
 *         description: Forbidden. User does not have permission to access this resource.
 *       500:
 *         description: Internal server error. Something went wrong.
 * /api/v1/orders/checkout:
 *   get:
 *     tags:
 *       - Orders
 *     description: Checkout the cart and create an order
 *     responses:
 *       200:
 *         description: Order created successfully.
 *       400:
 *         description: Bad request. Invalid input or cart is empty.
 *       401:
 *         description: Unauthorized. Authentication is required.
 *       403:
 *         description: Forbidden. User does not have permission to perform this action.
 *       500:
 *         description: Internal server error. Something went wrong.
 */

const router = require('express').Router()
const { checkout, orders } = require('../controllers/ordersController.js')
const { authenticateToken } = require('../auth/middleware/authTokenMiddleware.js')

router.use(authenticateToken)

router.get('/', orders)
router.get('/checkout', checkout)

module.exports = router
