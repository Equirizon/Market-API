require('dotenv').config({ quiet: true })
const express = require('express')
const app = express()
const logDev = require('./utils/devLogging.js')

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
const changeRole = require('./utils/changeRole.js')

// Setup API Routes
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', ordersRouter)

app.listen(port, () => {
  logDev(`listening at http://localhost:${port}`)
})

// changeRole({ email: 'equirizon@gmail.com'}, 'admin')

module.exports = app
