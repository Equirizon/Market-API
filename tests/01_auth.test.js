const request = require('supertest')
const app = require('../src/index.js')
const knex = require('../src/db/knex.js')
const changeRole = require('../src/utils/changeRole.js')
const createTestScenario = require('../src/utils/createTestScenario.js')
const token = process.env.TEST_TOKEN

beforeAll((done) => {
  done()
})

afterAll(async () => {
  return await new Promise((resolve, _reject) => {
    setTimeout(() => {
      knex.destroy()
      return resolve()
    }, 500)
  })
})

describe('api/v1/users/profile', () => {
  describe('POST', () => {
    const userProfile = {
      username: 'Equirizon',
      email: 'equirizon@gmail.com',
      password: '1592753',
    }
    // test('regsterUser()')
  })
  describe('Authentication checks', () => {
    test('should respond with 401 status code and a string containing "User needs to be logged in" if user is not logged in', async () => {
      const response = await request(app).get('/api/v1/users/profile')
      expect(response.statusCode).toBe(401)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
      expect(response.text).toBe('User needs to be logged in')
    })
    test('should respond with 403 status code and a string containing "Token is invalid or expired" if token is invalid or expired', async () => {
      const response = await request(app).get('/api/v1/users/profile').set('Authorization', `Bearer <token>`)
      expect(response.statusCode).toBe(403)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
      expect(response.text).toBe('Token is invalid or expired')
    })
  })

  describe('GET api/v1/users/profile', () => {
    test("getProfile() should respond with 200 status code and the logged in user's profile object in json", async () => {
      const response = await request(app).get('/api/v1/users/profile').set('Authorization', `Bearer ${token}`)
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
