const Auth = {
  Auth: {
    Register: {
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: { type: 'string', example: 'equirizon' },
                email: { type: 'string', format: 'email', example: 'equirizon@example.com' },
                password: { type: 'string', minLength: 6, example: 'strongPassword123' },
              },
              required: ['username', 'email', 'password'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'integer', example: 1 },
                  name: { type: 'string', example: 'equirizon' },
                  email: { type: 'string', format: 'email', example: 'equirizon@gmail.com' },
                  message: { type: 'string', example: 'User registered successfully' },
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
                example: '✖ Invalid input: expected string, received undefined → at username',
              },
            },
          },
        },
        409: {
          description: 'Conflict. User already exists.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string', example: 'Email already been used' },
                },
              },
            },
          },
        },
      },
    },
    Login: {
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string', format: 'email', example: 'equirizon@gmail.com' },
                password: { type: 'string', format: 'password', example: 'strongPassword123' },
              },
              required: ['email', 'password'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'User logged in successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Login successful' },
                  accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                  accessExpiresOn: { type: 'string', example: '<date> at <time>' },
                  accessExpiresIn: { type: 'integer', example: 3600 },
                  refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                  refreshExpiresOn: { type: 'string', example: '<date> at <time>' },
                  refreshExpiresIn: { type: 'integer', example: 604800 },
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
                example: '✖ Invalid input: expected string, received undefined → at email',
              },
            },
          },
        },
        401: {
          description: 'Unauthorized. Invalid credentials.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string', example: 'Email or Password is incorrect' },
                },
              },
            },
          },
        },
      },
    },
    Refresh: {
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
              },
              required: ['token'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Token refreshed successfully.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Sucessfully refreshed access token.' },
                  newAccessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                },
              },
            },
          },
        },
        401: {
          description: 'Unauthorized. Invalid request body.',
          content: {
            'text/plain': {
              schema: {
                type: 'string',
                example: 'Unauthorized',
              },
            },
          },
        },
        403: {
          description: 'Forbidden. Invalid or expired refresh token.',
          content: {
            'text/plain': {
              schema: {
                type: 'string',
                example: 'Forbidden',
              },
            },
          },
        },
      },
    },
    Logout: {
      responses: {
        204: {
          description: 'User logged out successfully.',
        },
        401: {
          description: 'Unauthorized. Invalid request.',
          content: {
            'text/plain': {
              schema: {
                type: 'string',
                example: 'Unauthorized',
              },
            },
          },
        },
        403: {
          description: 'Forbidden. User does not have permission to perform this action.',
          content: {
            'text/html': {
              schema: {
                type: 'string',
                example: 'Token is not valid or expired',
              },
            },
          },
        },
      },
    },
  },
}

module.exports = Auth
