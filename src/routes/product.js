/**
 * @openapi
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products (public)
 *     description: |
 *       Fetches a list of all available products. This endpoint is public and does not require authentication.
 *       Returns an array of product objects, each containing details such as id, name, description, price, stock, and creation date.
 *     operationId: listProducts
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/Products/get/responses/200'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *   post:
 *     tags:
 *       - Products
 *     summary: Add a new product (admin only)
 *     description: |
 *       Creates a new product in the system. This endpoint is restricted to admin users and requires authentication.
 *       Accepts product details in the request body and returns a success message upon successful creation.
 *     operationId: addProduct
 *     security:
 *       - JWTAuth: []
 *     requestBody:
 *       $ref: '#/components/schemas/Products/post/requestBody'
 *     responses:
 *       201:
 *         $ref: '#/components/schemas/Products/post/responses/201'
 *       400:
 *         $ref: '#/components/schemas/Products/post/responses/400'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PrivilegeError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a product by ID (public)
 *     description: |
 *       Fetches details of a specific product by its unique ID. This endpoint is public and does not require authentication.
 *       Returns the product object if found, otherwise returns a not found error.
 *     operationId: getProduct
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The unique identifier of the product
 *           schema:
 *             type: integer
 *             format: int64
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/Products/Id/get/responses/200'
 *       404:
 *         $ref: '#/components/schemas/Products/Id/get/responses/404'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product by ID (admin only)
 *     description: |
 *       Updates the details of an existing product identified by its ID. This endpoint is restricted to admin users and requires authentication.
 *       Accepts updated product information in the request body and returns a success message upon successful update.
 *     operationId: updateProduct
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The unique identifier of the product to be updated
 *           schema:
 *             type: integer
 *             format: int64
 *     requestBody:
 *       $ref: '#/components/schemas/Products/Id/put/requestBody'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/Products/Id/put/responses/200'
 *       400:
 *         $ref: '#/components/schemas/Products/Id/put/responses/400'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PrivilegeError'
 *       404:
 *         $ref: '#/components/schemas/Products/Id/put/responses/404'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by ID (admin only)
 *     description: |
 *       Deletes a product from the system by its unique ID. This endpoint is restricted to admin users and requires authentication.
 *       Returns a success message if the product is deleted, or an error if the product is not found or the user lacks permission.
 *     operationId: deleteProduct
 *     security:
 *       - JWTAuth: []
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The unique identifier of the product to be deleted
 *           schema:
 *             type: integer
 *             format: int64
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/Products/Id/delete/responses/200'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/PrivilegeError'
 *       404:
 *         $ref: '#/components/schemas/Products/Id/delete/responses/404'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

const router = require('express').Router()
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
