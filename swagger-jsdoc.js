const swaggerJsdoc = require('swagger-jsdoc')
// const fs = require('fs')
// const path = require('path')
const components = require('./open-api.components')

const options = {
  definition: {
    openapi: '3.0.4',
    info: {
      title: 'Market API',
      version: '1.0.0',
      description: 'A simple concept API for Market needs',
      email: 'equirizon@gmail.com',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    ...components,
  },
  apis: ['./src/routes/*.js', './src/auth/auth.js', './src/index.js'], // files containing annotations as above
}

const openapiSpecification = swaggerJsdoc(options)

// fs.writeFileSync(path.join(__dirname, 'openapi.json'), JSON.stringify(openapiSpecification, null, 2))

module.exports = openapiSpecification
