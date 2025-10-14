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
      Products: {
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
              type: 'integer',
              example: '2023-01-01T00:00:00Z',
            },
          },
        },
      },
    },
  },
}

module.exports = components
