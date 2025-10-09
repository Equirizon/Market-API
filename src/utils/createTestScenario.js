/**
 * Creates a test scenario utility for API endpoint testing.
 *
 * @param {Object} app - The Express application instance.
 * @param {string} [token] - The authentication token to use for requests.
 * @returns {{
 *   setAppInstance: (app: Object) => void,
 *   setTokenInstance: (token: string) => void,
 *   testClientTypes: (
 *     scenarios: Array<{
 *       route: string,
 *       test: string,
 *       client: string,
 *       response: number,
 *       body: Array<[string, any]> | string,
 *       badSyntax?: Object
 *     }>,
 *     method: string,
 *     headerType?: string,
 *     data?: Object
 *   ) => void
 * }}
 *
 * @example
 * const tester = createTestScenario(app, token);
 * tester.testClientTypes([...], 'post', 'json', { foo: 'bar' });
 */
const request = require('supertest')
const changeRole = require('./changeRole.js')

const createTestScenario = (app, token) => {
  let appInstance = app
  let tokenInstance = token || '<token>'
  if (!token) console.error('Token not provided')
  return {
    setAppInstance(app) {
      appInstance = app
    },
    setTokenInstance(token) {
      tokenInstance = token
    },
    testClientTypes(scenarios, method, headerType = 'json', data) {
      scenarios.forEach((scenario) => {
        routeRegex = /^(\/.+)+$/g
        if (!routeRegex.test(scenario.route)) throw new Error(`Invalid route: ${scenario.route}`)
        test(`${method.toUpperCase()} ${scenario.route} | ${scenario.test}`, async () => {
          await changeRole({ email: 'equirizon@gmail.com' }, scenario.client)
          let req = request(appInstance)[method](scenario.route).set('Authorization', `Bearer ${tokenInstance}`)
          if (data && /post|put|patch/i.test(method)) req = req.send(data)
          const response = await req
          expect(response.statusCode).toBe(scenario.response)
          expect(response.headers['content-type']).toEqual(expect.stringContaining(headerType))
          if (Array.isArray(response.body)) {
            return response.body.forEach((item) => {
              scenario.body.forEach((content) => {
                expect(item).toHaveProperty(content[0], content[1])
              })
            })
          }
          if (headerType === 'json' && scenario.body) {
            return scenario.body.forEach((content) => {
              expect(response.body).toHaveProperty(content[0], content[1])
            })
          }
          if (headerType === 'text') {
            expect(response.text).toBe(scenario.body)
          }
        })
        // checks for 400 on POST requests
        if (!scenario.badSyntax) return
        describe(`Bad request checks on ${method.toUpperCase()} ${scenario.route}`, () => {
          test(`${method.toUpperCase()} ${
            scenario.route
          } should respond with 400 status code if the body have incorrect syntax`, async () => {
            await changeRole({ email: 'equirizon@gmail.com' }, scenario.client)
            const response = await request(appInstance)
              [method](scenario.route)
              .set('Authorization', `Bearer ${tokenInstance}`)
              .send(scenario.badSyntax)
            expect(response.statusCode).toBe(400)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
            expect(response.text).toStrictEqual(expect.any(String))
          })
          test(`${method.toUpperCase()} ${
            scenario.route
          } should respond with 400 status code if there were no body provided`, async () => {
            await changeRole({ email: 'equirizon@gmail.com' }, scenario.client)
            const response = await request(appInstance)
              [method](scenario.route)
              .set('Authorization', `Bearer ${tokenInstance}`)
            expect(response.statusCode).toBe(400)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('text'))
            expect(response.text).toStrictEqual(expect.any(String))
          })
        })
      })
    },
  }
}

module.exports = createTestScenario
