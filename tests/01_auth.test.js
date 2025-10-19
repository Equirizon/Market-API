const request = require('supertest')
const app = require('../src/index.js')
const knex = require('../src/db/knex.js')
const authenticationChecks = require('../src/utils/authCheck.js')
const { badRequestchecks } = require('../src/utils/checkBadRequest.js')
const token = process.env.TEST_TOKEN

beforeAll(async () => {
  await knex.migrate.rollback({}, true) // rollback all
  await knex.migrate.latest()
})

afterAll(async () => {
  await knex.destroy()
})

const { checkAuth } = authenticationChecks(app)
const { checkBadRequest } = badRequestchecks(app)

describe('api/v1/auth/', () => {
  let refreshToken = null
  describe('POST api/v1/auth/register', () => {
    const userProfile = {
      username: 'Equirizon',
      email: 'equirizon@gmail.com',
      password: 'reallyStrongPassword123',
    }
    const incorrectSyntax = {
      name: 'Equirizon',
      mail: 'equirizon@gmail.com',
      passwords: 164375,
    }
    test('registerUser() should respond with 201 status code and a user object in json', async () => {
      const response = await request(app).post('/api/v1/auth/register').send(userProfile)
      expect(response.statusCode).toBe(201)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('id', expect.any(Number))
      expect(response.body).toHaveProperty('name', userProfile.username)
      expect(response.body).toHaveProperty('email', userProfile.email)
      expect(response.body).toHaveProperty('message', 'User registered successfully')
    })
    test('registerUser() should respond with 409 status code since we already created that user', async () => {
      const response = await request(app).post('/api/v1/auth/register').send(userProfile)
      expect(response.statusCode).toBe(409)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('error', 'Email already been used')
    })
    // 400 path tests
    checkBadRequest('/api/v1/auth/register', 'post', incorrectSyntax)
  })

  describe('POST api/v1/auth/login', () => {
    const incorrectSyntax = {
      name: 'Equirizon',
      mail: 'equirizon@gmail.com',
      passwords: 164375,
    }
    test('login() should respond with 200 status code with an object containing both access and refresh JWT tokens in json', async () => {
      const loginCredentials = {
        email: 'equirizon@gmail.com',
        password: 'reallyStrongPassword123',
      }
      const jwtRegex = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/
      const anyJwtToken = expect.stringMatching(jwtRegex)
      const response = await request(app).post('/api/v1/auth/login').send(loginCredentials)
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('message', 'Login successful')
      expect(response.body).toHaveProperty('accessToken', anyJwtToken)
      expect(response.body).toHaveProperty('refreshToken', anyJwtToken)
      refreshToken = response.body.refreshToken
    })
    test('login() should respond with 401 status code with an object containing error message in json if credentials are incorrect', async () => {
      const invalidLoginCredentials = {
        email: 'equirizon@gmail.com',
        password: 'wrong_password',
      }
      const response = await request(app).post('/api/v1/auth/login').send(invalidLoginCredentials)
      expect(response.statusCode).toBe(401)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('error', 'Email or Password is incorrect')
    })
    // 400 path tests
    checkBadRequest('/api/v1/auth/login', 'post', incorrectSyntax)
  })

  describe('POST api/v1/auth/refresh', () => {
    const incorrectSyntax = {
      notToken: refreshToken,
    }
    test('refreshToken() should respond with 201 status code and an object containing new access token in json if the supplied refresh token is valid', async () => {
      const token = {
        token: refreshToken,
      }
      const jwtRegex = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/
      const anyJwtToken = expect.stringMatching(jwtRegex)
      const response = await request(app).post('/api/v1/auth/refresh').send(token)
      expect(response.statusCode).toBe(201)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
      expect(response.body).toHaveProperty('newAccessToken', anyJwtToken)
      expect(response.body).toHaveProperty('message')
    })
    test('refreshToken() should respond with 403 status code and a string containing "Forbidden" if the supplied refresh token is invalid', async () => {
      const token = {
        token: '<token>',
      }
      const response = await request(app).post('/api/v1/auth/refresh').send(token)
      expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
      expect(response.statusCode).toBe(403)
      expect(response.text).toBe('Forbidden')
    })
    // 400 path tests
    checkBadRequest('/api/v1/auth/login', 'post', incorrectSyntax)
  })

  describe('DELETE api/v1/auth/logout', () => {
    const route = '/api/v1/auth/logout'

    checkAuth(route, 'delete')

    test('delete() should respond with 204 status code if user logged out successfully', async () => {
      const response = await request(app).delete(route).set('Authorization', `Bearer ${token}`)
      expect(response.statusCode).toBe(204)
    })
  })
})
