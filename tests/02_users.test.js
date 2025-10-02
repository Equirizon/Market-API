const request = require('supertest')
const app = require('../src/index.js')
const knex = require('../src/db/knex.js')
const createTestScenario = require('../src/utils/createTestScenario.js')
const authenticationChecks = require('../src/utils/authCheck.js')
const token = process.env.TEST_TOKEN

beforeAll(async () => {
  // await knex.migrate.rollback({}, true)
  await knex.migrate.latest()
  // await knex.seed.run() // commented assuming 01_auth test was ran
})

afterAll(async () => {
  await knex.destroy()
})

const { loopTestScenarios } = createTestScenario(app, token)
const { checkAuth } = authenticationChecks(app)

describe('api/v1/users', () => {
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
    scenarios.forEach((scenario) => {
      describe(`Auth checks for "${scenario.client.toUpperCase()}" client type`, () => {
        checkAuth(scenario.route, 'get')
      })
    })
    loopTestScenarios(scenarios, 'get')
  })

  describe('GET api/v1/users/profile', () => {
    const route = '/api/v1/users/profile'
    checkAuth(route, 'get')
    test("getProfile() should respond with 200 status code and the logged in user's profile object in json", async () => {
      const response = await request(app).get(route).set('Authorization', `Bearer ${token}`)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('id', expect.any(Number))
      expect(response.body).toHaveProperty('name', expect.any(String))
      expect(response.body).toHaveProperty('email', expect.any(String))
      expect(response.body).toHaveProperty('password', expect.any(String))
      expect(response.body).toHaveProperty('role', expect.stringMatching(/^(admin|user)$/))
      expect(response.body).toHaveProperty('created_at', expect.any(String))
    })
  })
})
