/**
 * @openapi
 * /cart:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Retrieve all items in the cart
 *     description: Returns a list of all items currently in the authenticated user's cart.
 *     operationId: viewCart
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/Cart/get/responses/200'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/schemas/Cart/get/responses/404'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add an item to the cart
 *     description: Adds a new product to the authenticated user's cart.
 *     operationId: addToCart
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       $ref: '#/components/schemas/Cart/post/requestBody'
 *     responses:
 *       201:
 *         $ref: '#/components/schemas/Cart/post/responses/201'
 *       400:
 *         $ref: '#/components/schemas/Cart/post/responses/400'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/schemas/Cart/post/responses/404'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * /cart/{id}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Remove an item from the cart
 *     description: Removes a specific item from the authenticated user's cart by item ID.
 *     operationId: deleteCartItem
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The unique identifier of the cart item to be removed
 *           schema:
 *             type: integer
 *             format: int64
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/Cart/delete/responses/200'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/schemas/Cart/delete/responses/404'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
const router = require('express').Router()
const { viewCart, addToCart, deleteCartItem } = require('../controllers/cartController.js')
const { authenticateToken } = require('../auth/middleware/authTokenMiddleware.js')

router.use(authenticateToken)

// private routes
router.get('/', viewCart)
router.post('/', addToCart)
router.delete('/:id', deleteCartItem)

module.exports = router
