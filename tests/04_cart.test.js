const request = require('supertest')
const app = require('../src/index.js')
const knex = require('../src/db/knex.js')
const authenticationChecks = require('../src/utils/authCheck.js')
const token = process.env.TEST_TOKEN

beforeAll(async () => {
  await knex.migrate.latest()
  await knex.seed.run({ specific: 'products.js' })
})

afterAll(async () => {
  await knex.destroy()
})

// GET methods are public thus not requiring createTestScenario()

const { checkAuth } = authenticationChecks(app)

describe('api/v1/cart', () => {
  describe('GET api/v1/cart', () => {
    const route = '/api/v1/cart'
    checkAuth(route, 'get')
    test('viewCart() should respond with 404 status code and an error message in json since the cart is empty', async () => {
      const response = await request(app).get(route).set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(404)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('error', 'Cart is empty')
    })
  })

  describe('POST api/v1/cart', () => {
    const route = '/api/v1/cart'
    const missingProduct = {
      productId: 1, // this product shouldn't exists since it has been deleted in 03_products test
      quantity: 2,
    }
    const invalidShape = {
      randomProperty1: 69,
      randomProperty2: 'this is a string',
      randomProperty2: undefined,
    }
    const product = {
      productId: 2, // this product exists since it has been created in 03_products test
      quantity: 6,
    }
    checkAuth(route, 'post')

    test('addToCart() should respond with 404 status code and an error message in json since the product does not exist', async () => {
      const response = await request(app).post(route).set('Authorization', `Bearer ${token}`).send(missingProduct)
      expect(response.statusCode).toBe(404)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('error', 'Cannot find product')
    })
    test(`addToCart() shoud respond with 201 status code and a message containing "Item #${product.productId} added to cart" and the cartItem object in json`, async () => {
      const response = await request(app).post(route).set('Authorization', `Bearer ${token}`).send(product)
      expect(response.statusCode).toBe(201)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('message', `Item #${product.productId} added to cart`)
      expect(response.body).toHaveProperty('cartItem', expect.any(Object))
    })
    test('addToCart() should respond with 400 status code if the req.body is incorrect or missing', async () => {
      const response = await request(app).post(route).set('Authorization', `Bearer ${token}`).send(invalidShape)
      expect(response.statusCode).toBe(400)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
      expect(response.text).toBe('Bad Request')
    })
  })

  describe('GET api/v1/cart', () => {
    const route = '/api/v1/cart'
    checkAuth(route, 'get')
    test('viewCart() should respond with 200 status code and an array of cart item objects in json', async () => {
      const response = await request(app).get(route).set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(Array.isArray(response.body)).toBe(true)
      response.body.forEach((cartItem) => {
        expect(cartItem).toHaveProperty('id')
        expect(cartItem).toHaveProperty('user_id')
        expect(cartItem).toHaveProperty('product_id')
        expect(cartItem).toHaveProperty('product_price')
        expect(cartItem).toHaveProperty('subtotal')
        expect(cartItem).toHaveProperty('quantity')
        expect(cartItem).toHaveProperty('added_at')
      })
    })
  })

  describe('DELETE api/v1/cart', () => {
    checkAuth('/api/v1/cart/1', 'delete')
    test('deleteCartItem() should respond with status 200 and a message in json', async () => {
      const response = await request(app).delete('/api/v1/cart/1').set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('message', 'Item removed from cart')
    })
    test('deleteCartItem() should respond with status 404 if the item was not found in the cart', async () => {
      const response = await request(app).delete('/api/v1/cart/1').set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(404)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('error', 'Item not found')
    })
  })
})
