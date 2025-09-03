require('dotenv').config();
const express = require('express')
const app = express()

const port = 3000

const users = require('./routes/users.js')
const auth = require('./routes/auth.js')

// Setup Middleware
app.use(express.json())

app.use('/api/v1/users', users)
app.use('/api/v1/auth', auth)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
