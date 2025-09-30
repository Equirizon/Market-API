const request = require('supertest')
const app = require('../src/index.js')
const knex = require('../src/db/knex.js')
const createTestScenario = require('../src/utils/createTestScenario.js')
const token = process.env.TEST_TOKEN

beforeAll(async () => {
  // await knex.migrate.rollback({}, true) // rollback all
  await knex.migrate.latest()
  await knex.seed.run()
})

afterAll(async () => {
  await knex.destroy()
})

const { loopTestScenarios } = createTestScenario(app, token)

describe('api/v1/users', () => {
  describe('Authentication checks', () => {
    test('should respond with 401 status code and a string containing "User needs to be logged in" if user is not logged in', async () => {
      const response = await request(app).post('/api/v1/products')
      expect(response.statusCode).toBe(401)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
      expect(response.text).toBe('User needs to be logged in')
    })
    test('should respond with 403 status code and a string containing "Token is invalid or expired" if token is invalid or expired', async () => {
      const response = await request(app).post('/api/v1/products').set('Authorization', `Bearer <token>`)
      expect(response.statusCode).toBe(403)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
      expect(response.text).toBe('Token is invalid or expired')
    })
  })

  describe('GET api/v1/users', () => {
    const scenarios = [
      {
        client: 'user',
        test: 'getUsers() should respond with 403 status code with an error message in json if the user is not an admin',
        route: '/api/v1/users',
        response: 403,
        body: [['error', 'Request requires admin privileges']],
      },
      {
        client: 'admin',
        test: 'getUsers() should get list of all users if the user is an admin and respond with 200 status code',
        route: '/api/v1/users',
        response: 200,
        body: [
          ['id', expect.any(Number)],
          ['name', expect.any(String)],
          ['email', expect.any(String)],
          ['password', expect.any(String)],
          ['role', expect.any(String)],
          ['created_at', expect.any(String)],
        ],
      },
    ]
    loopTestScenarios(scenarios, 'get')
  })
})
