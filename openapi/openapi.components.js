const Product = require('./schemas/Products.schema')
const Auth = require('./schemas/Auth.schema')
const Users = require('./schemas/Users.schema')
const Cart = require('./schemas/Cart.schema')
const Orders = require('./schemas/Orders.schema')

const components = {
  components: {
    securitySchemes: {
      JWTAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ...Auth,
      ...Users,
      ...Product,
      ...Cart,
      ...Orders,
    },
    responses: {
      UnauthorizedError: {
        description: 'Unauthorized. Authentication is required.',
        content: {
          'text/html': {
            schema: {
              type: 'string',
              example: 'User needs to be logged in',
            },
          },
        },
      },
      ForbiddenError: {
        description: 'Forbidden. You do not have permission to access this resource.',
        content: {
          'text/html': {
            schema: {
              type: 'string',
              example: 'Token is invalid or expired',
            },
          },
        },
      },
      PrivilegeError: {
        description: 'Forbidden. Only admins have access to this resource.',
        content: {
          'text/html': {
            schema: {
              type: 'string',
              example: 'User does not have the necessary privileges',
            },
          },
        },
      },
      InternalServerError: {
        description: 'Internal server error. Something went wrong.',
      },
    },
  },
}

module.exports = components
