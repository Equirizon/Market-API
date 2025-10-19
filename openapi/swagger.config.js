const swaggerJsdoc = require('swagger-jsdoc')
const components = require('./openapi.components')
const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 3000

const options = {
  definition: {
    openapi: '3.0.4',
    info: { 
      title: 'Market API',
      version: '1.0.0',
      description:
        'A simple concept API for Market needs\n\nSome useful link/s:\n- [The Market API repository](https://github.com/equirizon/market-api)',
      contact: {
        email: 'equirizon@gmail.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      // { url: 'https://market-api.example.com/api/v1' },
      { url: `http://localhost:${port}/api/v1`, description: 'Local Dev' },
    ],
    ...components,
  },
  apis: ['./src/routes/*.js', './src/auth/auth.js', './src/index.js'], // files containing @openapi annotations
}

const openapiSpecification = swaggerJsdoc(options)

// exports @openapi annotations as JSON file. delete existing file to update
const exportPath = path.join(__dirname, 'openapi.json')
if (!fs.existsSync(exportPath)) {
  fs.writeFileSync(exportPath, JSON.stringify(openapiSpecification, null, 2))
}

module.exports = openapiSpecification
