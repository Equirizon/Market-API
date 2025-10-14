/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Users/Auth
 *     summary: Registers a new user
 *     description: Register a new user by providing required credentials such as email and password. The endpoint validates the input and creates a new user account if the email is not already registered.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: equirizon
 *               email:
 *                 type: string
 *                 format: email
 *                 example: equirizon@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   format: password
 *                   example: strongPassword123
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: equirizon@gmail.com
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Bad request. Invalid input.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "✖ Invalid input: expected string, received undefined → at username"
 *       409:
 *         description: Conflict. User already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email already been used
 *       500:
 *         description: Internal server error. Something went wrong.
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Users/Auth
 *     summary: Login an existing user
 *     description: Authenticate a user by verifying email and password. Returns access and refresh tokens on successful authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: equirizon@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 accessToken:
 *                   type: integer
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 accessExpiresOn:
 *                   type: string
 *                   example: <date> at <time>
 *                 accessExpiresIn:
 *                   type: integer
 *                   example: 1h
 *                 refreshToken:
 *                   type: integer
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshExpiresOn:
 *                   type: integer
 *                   example: <date> at <time>
 *                 refreshExpiresIn:
 *                   type: integer
 *                   example: 7d
 *       400:
 *         description: Bad request. Invalid input.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "✖ Invalid input: expected string, received undefined → at username"
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email or Password is incorrect
 *       500:
 *         description: Internal server error. Something went wrong.
 * /api/v1/auth/refresh:
 *   post:
 *     tags:
 *       - Users/Auth
 *     summary: Refresh access token
 *     description: Refresh the access token using a valid refresh token. The endpoint requires the refresh token to be sent in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       201:
 *         description: Token refreshed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sucessfully refreshed access token.
 *                 newAccessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized. Invalid request.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unauthorized
 *       403:
 *         description: Forbidden. Invalid or expired refresh token.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Forbidden
 *       500:
 *         description: Internal server error. Something went wrong.
 * /api/v1/auth/logout:
 *   delete:
 *     tags:
 *       - Users/Auth
 *     summary: Logout user
 *     description: Logs out the authenticated user and revoke the associated refresh token. Requires a valid access token in the Authorization header.
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       204:
 *         description: User logged out successfully.
 *       401:
 *         description: Unauthorized. Invalid request.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Unauthorized
 *       403:
 *         description: Forbidden. User does not have permission to perform this action.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: Token is not valid or expired
 *       500:
 *         description: Internal server error. Something went wrong.
 */
const router = require('express').Router()
const { register, login, logout, refreshToken } = require('./authController.js')
const { authenticateRefreshToken, authenticateToken } = require('./middleware/authTokenMiddleware.js')

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', authenticateRefreshToken, refreshToken)
router.delete('/logout', authenticateToken, logout)

module.exports = router
