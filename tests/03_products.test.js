const request = require('supertest')
const app = require('../src/index.js')
const knex = require('../src/db/knex.js')
const createTestScenario = require('../src/utils/createTestScenario.js')
const authenticationChecks = require('../src/utils/authCheck.js')
const token = process.env.TEST_TOKEN

beforeAll(async () => {
  await knex.migrate.latest()
  // await knex.seed.run() // commented assuming 01_auth test was ran
})

afterAll(async () => {
  await knex.destroy()
})

/* GET endpoints return the same result regardless of client type,
so we don't need to set up a custom test scenario with createTestScenario(). */

const { testClientTypes } = createTestScenario(app, token)
const { checkAuth } = authenticationChecks(app)

describe('POST api/v1/products (admin)', () => {
  const newProduct = {
    name: 'Test Product',
    description: 'This is a test product',
    price: 9.99,
    stock: 100,
  }
  const incorrectSyntax = {
    names: 1024,
    describe: 'This is a test product',
    prices: '9.99',
    stocks: '100',
  }
  const scenarios = [
    {
      client: 'user',
      test: 'should respond with 403 status code if user is not an admin with an error message containing "Request requires admin privileges" in json',
      route: '/api/v1/products/',
      response: 403,
      body: [['error', 'Request requires admin privileges']],
    },
    {
      client: 'admin',
      test: 'addProduct() should respond with 201 status code with id and message containing "Product <product> added" in json',
      route: '/api/v1/products/',
      response: 201,
      body: [
        ['id', expect.any(Number)],
        ['message', `Product ${newProduct.name} added`],
      ],
      badSyntax: incorrectSyntax,
    },
  ]
  scenarios.forEach((scenario) => {
    describe(`Auth checks for "${scenario.client.toUpperCase()}" client type`, () => {
      checkAuth(scenario.route, 'post')
    })
  })
  testClientTypes(scenarios, 'post', 'json', newProduct)
})

describe('GET api/v1/products (public)', () => {
  test('listProducts() should respond with an status code of 200 and array of products objects in json', async () => {
    const response = await request(app).get('/api/v1/products')
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    expect(Array.isArray(response.body)).toBe(true)
    response.body.forEach((product) => {
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('description')
      expect(product).toHaveProperty('price')
      expect(product).toHaveProperty('stock')
      expect(product).toHaveProperty('created_at')
    })
  })
})

describe('GET api/v1/products/:id (public)', () => {
  test('getProduct() should respond with 200 status code if product is present', async () => {
    const response = await request(app).get('/api/v1/products/1')
    expect(response.statusCode).toBe(200)
  })
  test('getProduct() should respond with an object containing product in json', async () => {
    const response = await request(app).get('/api/v1/products/1')
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('price')
    expect(response.body).toHaveProperty('stock')
    expect(response.body).toHaveProperty('created_at')
  })
  test('getProduct() should respond with 404 status code is product is not present', async () => {
    const response = await request(app).get('/api/v1/products/2')
    expect(response.statusCode).toBe(404)
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    expect(response.body).toHaveProperty('error', 'Product does not exist')
  })
})

describe('PUT api/v1/products/:id (admin)', () => {
  const updatedProduct = {
    name: 'Updated Test Product',
    description: 'This is an updated test product',
    price: 19.99,
    stock: 50,
  }
  const badProduct = {
    product: 1,
    describe: 'This is a malformed object',
    price: '100',
    stock: '0',
  }
  const scenarios = [
    {
      client: 'user',
      test: 'updateProduct() should respond with 403 status code if user is not an admin with an error message containing "Request requires admin privileges" in json',
      route: '/api/v1/products/2',
      response: 403,
      body: [['error', 'Request requires admin privileges']],
    },
    {
      client: 'admin',
      test: 'updateProduct() should respond with 404 status code if product to be updated is not present',
      route: '/api/v1/products/2',
      response: 404,
      body: [['error', `Product does not exist`]],
    },
    {
      client: 'admin',
      test: 'updateProduct() should respond with 200 status code with message containing json if product is successfully updated',
      route: '/api/v1/products/1',
      response: 200,
      body: [['message', `Product ${updatedProduct.name} updated`]],
      badSyntax: badProduct,
    },
  ]

  scenarios.forEach((scenario) => {
    describe(`Auth checks for "${scenario.client.toUpperCase()}" client type`, () => {
      checkAuth(scenario.route, 'put')
    })
  })
  testClientTypes(scenarios, 'put', 'json', updatedProduct)

  describe('GET api/v1/products/:id after update (public)', () => {
    test('listProducts() should respond with an status code of 200 and array of updated product objects in json', async () => {
      const response = await request(app).get('/api/v1/products/1')
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('id')
      expect(response.body).toHaveProperty('name', updatedProduct.name)
      expect(response.body).toHaveProperty('description', updatedProduct.description)
      expect(response.body).toHaveProperty('price', updatedProduct.price)
      expect(response.body).toHaveProperty('stock', updatedProduct.stock)
      expect(response.body).toHaveProperty('created_at')
    })
  })
})

describe('DELETE api/v1/products/:id (admin)', () => {
  const scenarios = [
    {
      client: 'user',
      test: 'should respond with 403 status code if user is not an admin with an error message containing "Request requires admin privileges" in json',
      route: '/api/v1/products/2',
      response: 403,
      body: [['error', 'Request requires admin privileges']],
    },
    {
      client: 'admin',
      test: 'should respond with 404 status code if product to be deleted is not present',
      route: '/api/v1/products/2',
      response: 404,
      body: [['error', `Product does not exist`]],
    },
    {
      client: 'admin',
      test: 'deleteProduct: should respond with 200 status code with message containing "Product <product> deleted" in json',
      route: '/api/v1/products/1',
      response: 200,
      body: [['message', `Product deleted successfully`]],
    },
  ]

  scenarios.forEach((scenario) => {
    describe(`Auth checks for "${scenario.client.toUpperCase()}" client type`, () => {
      checkAuth(scenario.route, 'delete')
    })
  })
  testClientTypes(scenarios, 'delete', 'json')

  describe('GET api/v1/products/:id after delete (public)', () => {
    test('deleteProduct: check whether the product is deleted from the database', async () => {
      const response = await request(app).get('/api/v1/products/1')
      expect(response.statusCode).toBe(404)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('error', 'Product does not exist')
    })
  })
})
