/**
 * @openapi
 * /api/v1/cart:
 *   get:
 *     tags:
 *       - Cart
 *     description: Get all items in the cart
 *     responses:
 *       200:
 *         description: Returns a list of items in the cart.
 *       401:
 *         description: Unauthorized. Authentication is required.
 *       403:
 *         description: Forbidden. User does not have permission to access this resource.
 *       404:
 *         description: Not Found. The specified resource could not be found. Cart is empty.
 *       500:
 *         description: Internal server error. Something went wrong.
 *   post:
 *     tags:
 *       - Cart
 *     description: Add a new item to the cart
 *     responses:
 *       201:
 *         description: Item added to cart successfully.
 *       400:
 *         description: Bad request. Invalid input.
 *       401:
 *         description: Unauthorized. Authentication is required.
 *       403:
 *         description: Forbidden. User does not have permission to perform this action.
 *       404:
 *         description: Not Found. The product could not be found.
 *       500:
 *         description: Internal server error. Something went wrong.
 *   delete:
 *     tags:
 *       - Cart
 *     description: Remove an item from the cart
 *     responses:
 *       200:
 *         description: Item removed from cart successfully.
 *       401:
 *         description: Unauthorized. Authentication is required.
 *       403:
 *         description: Forbidden. User does not have permission to perform this action.
 *       404:
 *         description: Not Found. The specified resource could not be found.
 *       500:
 *         description: Internal server error. Something went wrong.
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
