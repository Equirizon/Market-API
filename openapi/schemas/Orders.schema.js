const Orders = {
  Orders: {
    get: {
      responses: {
        200: {
          description: 'Returns a list of orders',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 1 },
                    user_id: { type: 'integer', example: 1 },
                    total_amount: { type: 'integer', example: 2800 },
                    createdAt: { type: 'string', format: 'date-time', example: '2023-01-01T00:00:00Z' },
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Not found, Order does not exist',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string', example: 'No orders found for this user' },
                },
              },
            },
          },
        },
      },
    },
    Checkout: {
      get: {
        responses: {
          200: {
            description: 'Order created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      orderId: { type: 'integer', example: 1 },
                      message: { type: 'string', example: 'Checkout successful' },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad Request. There is not enough stock for the product requested or the cart is empty',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Insufficient stock for one or more products',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

module.exports = Orders
