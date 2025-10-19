/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Users/Auth
 *     summary: Registers a new user
 *     description: Register a new user by providing required credentials such as email and password. The endpoint validates the input and creates a new user account if the email is not already registered.
 *     operationId: registerUser
 *     requestBody:
 *       $ref: '#/components/schemas/Auth/Register/requestBody'
 *     responses:
 *       201:
 *         $ref: '#/components/schemas/Auth/Register/responses/201'
 *       400:
 *         $ref: '#/components/schemas/Auth/Register/responses/400'
 *       409:
 *         $ref: '#/components/schemas/Auth/Register/responses/409'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * /auth/login:
 *   post:
 *     tags:
 *       - Users/Auth
 *     summary: Login an existing user
 *     description: Authenticate a user by verifying email and password. Returns access and refresh tokens on successful authentication.
 *     operationId: login
 *     requestBody:
 *       $ref: '#/components/schemas/Auth/Login/requestBody'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/Auth/Login/responses/200'
 *       400:
 *         $ref: '#/components/schemas/Auth/Login/responses/400'
 *       401:
 *         $ref: '#/components/schemas/Auth/Login/responses/401'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * /auth/refresh:
 *   post:
 *     tags:
 *       - Users/Auth
 *     summary: Refresh the access token
 *     description: Refresh the access token using a valid refresh token. The endpoint requires the refresh token to be sent in the request body.
 *     operationId: refreshToken
 *     requestBody:
 *      $ref: '#/components/schemas/Auth/Refresh/requestBody'
 *     responses:
 *       201:
 *         $ref: '#/components/schemas/Auth/Refresh/responses/201'
 *       401:
 *         $ref: '#/components/schemas/Auth/Refresh/responses/401'
 *       403:
 *         $ref: '#/components/schemas/Auth/Refresh/responses/403'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * /auth/logout:
 *   delete:
 *     tags:
 *       - Users/Auth
 *     summary: Logout user
 *     description: Logs out the authenticated user and revoke the associated refresh token. Requires a valid access token in the Authorization header.
 *     operationId: logout
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       204:
 *         $ref: '#/components/schemas/Auth/Logout/responses/204'
 *       401:
 *         $ref: '#/components/schemas/Auth/Logout/responses/401'
 *       403:
 *         $ref: '#/components/schemas/Auth/Logout/responses/403'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
const router = require('express').Router()
const { register, login, logout, refreshToken } = require('./authController.js')
const { authenticateRefreshToken, authenticateToken } = require('./middleware/authTokenMiddleware.js')

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', authenticateRefreshToken, refreshToken)
router.delete('/logout', authenticateToken, logout)

module.exports = router
