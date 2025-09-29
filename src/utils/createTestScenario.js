/**
 * Creates a test scenario utility for running API endpoint tests with dynamic app and token instances.
 *
 * @param {import('express').Application} app - The Express application instance to test against.
 * @param {string} token - The authentication token to use in requests.
 * @returns {{
 *   setApp: (app: import('express').Application) => void,
 *   setToken: (token: string) => void,
 *   loopTestScenarios: (
 *     scenarios: Array<{
 *       test: string,
 *       client: any,
 *       route: string,
 *       response: number,
 *       body: any,
 *     }>,
 *     method: string,
 *     data?: any,
 *     headerType?: string
 *   ) => void
 * }}
 *   An object with methods to set the app/token and loop through test scenarios.
 */

const request = require('supertest')
const changeRole = require('./changeRole.js')

const createTestScenario = (app, token) => {
  let appInstance = app
  let tokenInstance = token || '<token>'

  return {
    setApp(app) {
      appInstance = app
    },
    setToken(token) {
      tokenInstance = token
    },
    loopTestScenarios(scenarios, method, data, headerType = 'json') {
      scenarios.forEach((scenario) => {
        test(scenario.test, async () => {
          await changeRole(1, scenario.client)
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
      })
    },
  }
}

module.exports = createTestScenario
