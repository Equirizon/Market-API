require('dotenv').config()
const express = require('express')
const app = express()

const port = 3000

// Setup Middleware
app.use(express.json())

const usersRouter = require('./routes/users.js')
const authRouter = require('./routes/auth.js')
const cartRouter = require('./routes/cart.js')
const productRouter = require('./routes/product.js')
const ordersRouter = require('./routes/orders.js')

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', ordersRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
