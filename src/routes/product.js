/**
 * @openapi
 * /api/v1/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products
 *     description: |
 *       Fetches a list of all available products. This endpoint is public and does not require authentication.
 *       Returns an array of product objects, each containing details such as id, name, description, price, stock, and creation date.
 *     operationId: listProducts
 *     responses:
 *       200:
 *         description: Returns a list of products.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       500:
 *         description: Internal server error. Something went wrong.
 *   post:
 *     tags:
 *       - Products
 *     summary: Add a new product (admin only)
 *     description: |
 *       Creates a new product in the system. This endpoint is restricted to admin users and requires authentication.
 *       Accepts product details in the request body and returns a success message upon successful creation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: XL Eggs
 *               description:
 *                 type: string
 *                 example: Fresh organic eggs from free-range chickens.
 *               price:
 *                 type: integer
 *                 example: 280
 *     responses:
 *       201:
 *         description: Product added successfully.
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Product <product name> added
 *                id:
 *                  type: integer
 *                  example: 2
 *       400:
 *         description: Bad request. Invalid input.
 *         content:
 *          text/html:
 *            schema:
 *              type: string
 *              example: "✖ Invalid input: expected string, received undefined → at name ✖ Invalid input: expected number, received string → at price"
 *       401:
 *         description: Unauthorized. Authentication is required.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: User needs to be logged in
 *       403:
 *         description: Forbidden. Only admins can access this resource.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: Token is invalid or expired
 *       500:
 *         description: Internal server error. Something went wrong.
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a product by ID
 *     description: |
 *       Fetches details of a specific product by its unique ID. This endpoint is public and does not require authentication.
 *       Returns the product object if found, otherwise returns a not found error.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: Returns the product with the specified ID.
 *       404:
 *         description: Not Found. The specified resource could not be found.
 *       500:
 *         description: Internal server error. Something went wrong.
 *   put:
 *     tags:
 *       - Products
 *     summary: Update a product by ID
 *     description: |
 *       Updates the details of an existing product identified by its ID. This endpoint is restricted to admin users and requires authentication.
 *       Accepts updated product information in the request body and returns a success message upon successful update.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       400:
 *         description: Bad request. Invalid input.
 *       401:
 *         description: Unauthorized. Authentication is required.
 *       403:
 *         description: Forbidden. User does not have permission to perform this action.
 *       404:
 *         description: Not Found. The specified resource could not be found.
 *       500:
 *         description: Internal server error. Something went wrong.
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product by ID
 *     description: |
 *       Deletes a product from the system by its unique ID. This endpoint is restricted to admin users and requires authentication.
 *       Returns a success message if the product is deleted, or an error if the product is not found or the user lacks permission.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
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
