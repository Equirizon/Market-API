const request = require('supertest')

const authenticationChecks = (app) => {
  let appInstance = app
  return {
    setAppInstance(app) {
      appInstance = app
    },
    checkAuth(route, method) {
      describe(`Authentication checks on ${method.toUpperCase()} ${route}`, () => {
        test('should respond with 401 status code and a string containing "User needs to be logged in" if user is not logged in', async () => {
          const response = await request(appInstance)[method](route)
          expect(response.statusCode).toBe(401)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
          expect(response.text).toBe('User needs to be logged in')
        })
        test('should respond with 403 status code and a string containing "Token is invalid or expired" if token is invalid or expired', async () => {
          const response = await request(appInstance)[method](route).set('Authorization', `Bearer <token>`)
          expect(response.statusCode).toBe(403)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
          expect(response.text).toBe('Token is invalid or expired')
        })
      })
    },
  }
}

module.exports = authenticationChecks
