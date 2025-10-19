const Users = {
  Users: {
    responses: {
      200: {
        description: 'Returns a list of all users.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  name: { type: 'string', example: 'Equirizon' },
                  email: { type: 'string', example: 'equirizon@example.com' },
                  role: { type: 'string', enum: ['admin', 'user'], example: 'admin' },
                  created_at: { type: 'string', format: 'date-time', example: '2023-01-01T00:00:00Z' },
                },
              },
            },
          },
        },
      },
    },
    Profile: {
      responses: {
        200: {
          description: 'Returns the profile of the authenticated user.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  name: { type: 'string', example: 'Equirizon' },
                  email: { type: 'string', example: 'equirizon@gmail.com' },
                  role: { type: 'string', enum: ['admin', 'user'], example: 'admin' },
                  created_at: { type: 'string', format: 'date-time', example: '2023-01-01T00:00:00Z' },
                },
              },
            },
          },
        },
      },
    },
  },
}

module.exports = Users
