const request = require('supertest')
const app = require('../src/index.js')
const knex = require('../src/db/knex.js')
const authenticationChecks = require('../src/utils/authCheck.js')
const token = process.env.TEST_TOKEN

beforeAll(async () => {
  await knex.migrate.latest()
})

afterAll(async () => {
  await knex.destroy()
})

// GET endpoints return the same result regardless of client type,
// so we don't need to set up a custom test scenario with createTestScenario().

const { checkAuth } = authenticationChecks(app)

describe('api/v1/orders/', () => {
  describe('GET api/v1/orders/checkout', () => {
    checkAuth('/api/v1/orders/checkout', 'get')
    test('checkout() should respond with 400 status code and an error message in json if there is nothing to check out', async () => {
      const response = await request(app).get('/api/v1/orders/checkout').set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(400)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('error', 'Cart is empty')
    })
    test('checkout() respond with 400 status code if there is not enough stock for the product in the cart', async () => {
      // seed the cart with items where the requested quantity exceeds available product stock
      await knex.seed.run({ specific: 'cart_01.js' })
      const response = await request(app).get('/api/v1/orders/checkout').set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(400)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('error', 'Insufficient stock for one or more products')
    })
  })

  describe('GET api/v1/orders', () => {
    checkAuth('/api/v1/orders', 'get')
    test('orders() should respond with 404 status code and an error message in json if there user has no current orders', async () => {
      const response = await request(app).get('/api/v1/orders').set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(404)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('error', 'No orders found for this user')
    })
  })

  describe('GET api/v1/orders/checkout', () => {
    test('checkout() respond with 200 status code and a message object in json', async () => {
      // seed the cart with items where the requested quantity does not exceed available product stock
      await knex.seed.run({ specific: 'cart_02.js' })
      const response = await request(app).get('/api/v1/orders/checkout').set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('message')
    })
  })

  describe('GET api/v1/orders', () => {
    test('orders() should respond with 200 status code and an array if orders object in json', async () => {
      const response = await request(app).get('/api/v1/orders').set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(Array.isArray(response.body)).toBe(true)
      response.body.forEach((order) => {
        expect(order).toHaveProperty('created_at')
        expect(order).toHaveProperty('id')
        expect(order).toHaveProperty('total_amount')
        expect(order).toHaveProperty('user_id')
      })
    })
  })
})
