/**
 * @openapi
 * tags:
 *   - name: Users/Auth
 *     description: Endpoints for user management and authentication, including registration, login, profile updates, and password management.
 *   - name: Products
 *     description: Endpoints for managing products, including listing, creating, updating, and deleting products in the marketplace.
 *   - name: Cart
 *     description: Endpoints for accessing and modifying the user's shopping cart, such as adding, removing, and viewing cart items.
 *   - name: Orders
 *     description: Endpoints for handling orders, including order creation, tracking, updating, and viewing order history.
 */

require('dotenv').config({ quiet: true })
const express = require('express')
const app = express()
const logDev = require('./utils/devLogging.js')
const swaggerUi = require('swagger-ui-express')
const openapiSpecification = require('../openapi/swagger.config.js')

const port = process.env.PORT || 3000

logDev('Running in development mode')

// Setup Middleware
app.use(express.json())

// Import routes
const usersRouter = require('./routes/users.js')
const authRouter = require('./auth/auth.js')
const cartRouter = require('./routes/cart.js')
const productRouter = require('./routes/product.js')
const ordersRouter = require('./routes/orders.js')

// Setup API Routes
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', ordersRouter)
// API documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.listen(port, () => {
  logDev(`listening at http://localhost:${port}`)
})

module.exports = app
