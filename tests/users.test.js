const request = require('supertest')
const app = require('../src/index.js')
const knex = require('../src/db/knex.js')
const changeRole = require('../src/utils/changeRole.js')
const token = process.env.TEST_TOKEN

beforeAll((done) => {
  done()
})

afterAll(async () => {
  await changeRole(1, 'user')
  return await new Promise((resolve, _reject) => {
    setTimeout(() => {
      knex.destroy()
      return resolve()
    }, 500)
  })
})

describe('api/v1/users', () => {
  describe('GET api/v1/users', () => {
    test('should respond with 401 status code if user is not logged in', async () => {
      const response = await request(app).get('/api/v1/users')
      expect(response.body).toBeDefined()
      expect(response.statusCode).toBe(401)
    })
    test('should respond with 403 status code if token is invalid or expired', async () => {
      const response = await request(app).get('/api/v1/users').set('Authorization', `Bearer <token>`)
      expect(response.statusCode).toBe(403)
    })
    test('getUsers: should get list of all users if the user is an admin and respond with 200 status code', async () => {
      await changeRole(1, 'admin')
      const response = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(Array.isArray(response.body)).toBe(true)
      response.body.forEach((user) => {
        expect(user).toHaveProperty('id', expect.any(Number))
        expect(user).toHaveProperty('name', expect.any(String))
        expect(user).toHaveProperty('email', expect.any(String))
        expect(user).toHaveProperty('password', expect.any(String))
        expect(user).toHaveProperty('role', 'admin')
        expect(user).toHaveProperty('created_at', expect.any(String))
      })
    })
    test('getUsers: should respond with 403 status code with an error message in json if the user is not an admin', async () => {
      await changeRole(1, 'user')
      const response = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(403)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('error', 'Request requires admin privileges')
    })
  })
})
