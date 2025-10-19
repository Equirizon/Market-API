const Products = {
  Products: {
    get: {
      responses: {
        200: {
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
                    name: {
                      type: 'string',
                      example: 'XL Eggs',
                    },
                    description: {
                      type: 'string',
                      example: 'Bounty Fresh XL eggs 1 tray/s',
                    },
                    price: {
                      type: 'integer',
                      example: 280,
                    },
                    stock: {
                      type: 'integer',
                      example: 30,
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
                name: {
                  type: 'string',
                  example: 'XL Eggs',
                },
                description: {
                  type: 'string',
                  example: 'Fresh organic eggs from free-range chickens.',
                },
                price: {
                  type: 'integer',
                  example: 280,
                },
              },
              required: ['name', 'description', 'price'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Product added successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Product <product name> added',
                  },
                  id: {
                    type: 'integer',
                    example: 2,
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
                  '✖ Invalid input: expected string, received undefined → at name ✖ Invalid input: expected number, received string → at price',
              },
            },
          },
        },
      },
    },
    Id: {
      get: {
        responses: {
          200: {
            description: 'Returns the product with the specified ID.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      example: 2,
                    },
                    name: {
                      type: 'string',
                      example: 'XL Eggs',
                    },
                    description: {
                      type: 'string',
                      example: 'Bounty Fresh XL eggs 1 tray/s',
                    },
                    price: {
                      type: 'integer',
                      example: 280,
                    },
                    stock: {
                      type: 'integer',
                      example: 30,
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
          404: {
            description: 'Not Found. The specified resource could not be found.',
            content: {
              'text/html': {
                schema: {
                  type: 'string',
                  example: 'Product with ID <id> not found',
                },
              },
            },
          },
        },
      },
      put: {
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'XL Eggs',
                  },
                  description: {
                    type: 'string',
                    example: 'Fresh organic eggs from free-range chickens.',
                  },
                  price: {
                    type: 'integer',
                    example: 280,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Product updated successfully.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Product <product name> updated',
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
                    '✖ Invalid input: expected string, received undefined → at name ✖ Invalid input: expected number, received string → at price',
                },
              },
            },
          },
        },
      },
      delete: {
        responses: {
          200: {
            description: 'Product deleted successfully.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Product with ID <id> deleted',
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'Not Found. The specified resource could not be found.',
            content: {
              'text/html': {
                schema: {
                  type: 'string',
                  example: 'Product with ID <id> not found',
                },
              },
            },
          },
        },
      },
    },
  },
}

module.exports = Products
