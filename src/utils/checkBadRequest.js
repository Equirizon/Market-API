const request = require('supertest')

const badRequestchecks = (app, token = '<token>') => {
  let appInstance = app
  let tokenInstance = token
  return {
    setAppInstance(app) {
      appInstance = app
    },
    setTokenInstance(token) {
      tokenInstance = token
    },
    checkBadRequest(route, method, incorrectSyntax) {
      routeRegex = /^(\/.+)+$/g
      if (!routeRegex.test(route)) throw new Error(`Invalid route: ${route}`)
      describe(`Bad request checks on ${method.toUpperCase()} ${route}`, () => {
        test(`${route} should respond with 400 status code if the body have incorrect syntax`, async () => {
          const response = await request(app)
            [method](route)
            .set('Authorization', `Bearer ${tokenInstance}`)
            .send(incorrectSyntax)
          expect(response.statusCode).toBe(400)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
          expect(response.text).toStrictEqual(expect.any(String))
        })
        test(`${route} should respond with 400 status code if there were no body provided`, async () => {
          const response = await request(app)[method](route).set('Authorization', `Bearer ${tokenInstance}`)
          expect(response.statusCode).toBe(400)
          expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
          expect(response.text).toStrictEqual(expect.any(String))
        })
      })
    },
  }
}

module.exports = { badRequestchecks }
