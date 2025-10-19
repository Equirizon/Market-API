const Cart = {
  Cart: {
    get: {
      responses: {
        200: {
          description: 'Successfully retrieved the list of cart items.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 2,
                    },
                    user_id: {
                      type: 'integer',
                      example: 1,
                    },
                    product_id: {
                      type: 'integer',
                      example: 2,
                    },
                    product_price: {
                      type: 'integer',
                      example: 280,
                    },
                    subtotal: {
                      type: 'integer',
                      example: 2800,
                    },
                    quantity: {
                      type: 'integer',
                      example: 10,
                    },
                    created_at: {
                      type: 'string',
                      format: 'date-time',
                      example: '2023-01-01T00:00:00Z',
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Not Found. The cart is empty or does not exist.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string', example: 'Cart is empty' },
                },
              },
            },
          },
        },
      },
    },
    post: {
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                productId: {
                  type: 'integer',
                  description: 'The ID of the product to add',
                  example: 1,
                },
                quantity: {
                  type: 'integer',
                  description: 'The quantity of the product to add',
                  example: 10,
                },
              },
              required: ['productId', 'quantity'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Item added to cart successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Item #4 added to cart' },
                  cartItem: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer', example: 10 },
                      product_id: { type: 'integer', example: 4 },
                      quantity: { type: 'integer', example: 10 },
                      product_price: { type: 'integer', example: 1030 },
                      subtotal: { type: 'integer', example: 10300 },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad request. Invalid input.',
          content: {
            'text/html': {
              schema: {
                type: 'string',
                example:
                  '✖ Unrecognized key: "productId" ✖ Invalid input: expected number, received undefined → at product_id',
              },
            },
          },
        },
        404: {
          description: 'Not Found. The specified resource could not be found.',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { error: { type: 'string', example: 'Cannot find product' } } },
            },
          },
        },
      },
    },
    delete: {
      responses: {
        200: {
          description: 'Item removed from cart successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Item removed from cart',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Not found. The specified cart item could not be found',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { error: { type: 'string', example: 'Item does not exist' } } },
            },
          },
        },
      },
    },
  },
}

module.exports = Cart
