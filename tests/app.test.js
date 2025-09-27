const request = require('supertest')
const app = require('../src/index.js')
const knex = require('../src/db/knex.js')

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

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXF1aXJpem9uIiwiZW1haWwiOiJlcXVpcml6b25AZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTc1ODgxNTc3MywiZXhwIjoxNzU4ODE2MzczfQ.t_nMO-J3knBsmFRsUdIrTJMYNewebf2zVQ6tZcXe3WE'

describe('GET /api/v1/users', () => {
  describe('get list of all users (admin privileges required)', () => {
    test('should respond with 401 status code if no token is provided', async () => {
      const response = await request(app).get('/api/v1/users')
      expect(response.body).toBeDefined()
      expect(response.statusCode).toBe(401)
    })
    test('should respond with 200 status code', async () => {
      const response = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
    })
    test('should respond with an array of user objects in json', async () => {
      const response = await request(app).get('/api/v1/users').set('Authorization', `Bearer ${token}`)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(Array.isArray(response.body)).toBe(true)
      response.body.forEach((user) => {
        expect(user).toHaveProperty('id')
        expect(user).toHaveProperty('name')
        expect(user).toHaveProperty('email')
      })
    })
  })
})
