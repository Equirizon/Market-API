/**
 * @openapi
 * /api/v1/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Retrieve all orders for the authenticated user
 *     description: |
 *       Returns a list of all orders associated with the authenticated user.
 *       Requires a valid authentication token. Only orders belonging to the requesting user will be returned.
 *     operationId: orders
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/Orders/get/responses/200'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/schemas/Orders/get/responses/404'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * /api/v1/orders/checkout:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Checkout the cart and create a new order
 *     description: |
 *       Processes the current user's cart and creates a new order.
 *       Requires authentication. The cart must contain valid items.
 *     operationId: checkout
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/Orders/Checkout/get/responses/200'
 *       400:
 *         $ref: '#/components/schemas/Orders/Checkout/get/responses/400'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

const router = require('express').Router()
const { checkout, orders } = require('../controllers/ordersController.js')
const { authenticateToken } = require('../auth/middleware/authTokenMiddleware.js')

router.use(authenticateToken)

router.get('/', orders)
router.get('/checkout', checkout)

module.exports = router
