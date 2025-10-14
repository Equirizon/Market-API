/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     tags:
 *       - Users/Auth
 *     summary: Get all users (admin only)
 *     description: Gets all existing users from the DB
 *     operationId: getUsers
 *     responses:
 *       200:
 *         description: Returns a list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Equirizon
 *                   email:
 *                     type: string
 *                     example: equirizon@gmail.com
 *                   role:
 *                     type: string
 *                     enum: [admin, user]
 *                   created_at:
 *                     type: string
 *                     example: 2023-01-01T00:00:00Z
 *       401:
 *         description: Unauthorized. Authentication is required.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: User needs to be logged in
 *       403:
 *         description: Forbidden. Only admins can access this resource.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: Token is invalid or expired
 * /api/v1/users/profile:
 *   get:
 *     tags:
 *       - Users/Auth
 *     summary: Gets own profile
 *     description: Get the profile of the authenticated user
 *     operationId: getProfile
 *     responses:
 *       200:
 *         description: Returns the profile of the authenticated user.
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
 *                   example: Equirizon
 *                 email:
 *                   type: string
 *                   example: equirizon@gmail.com
 *                 role:
 *                   type: string
 *                   enum: [admin, user]
 *                 created_at:
 *                   type: string
 *                   example: 2023-01-01T00:00:00Z
 *       401:
 *         description: Unauthorized. Authentication is required.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: User needs to be logged in
 *       403:
 *         description: Forbidden. Only admins can access this resource.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: Token is invalid or expired
 */

/* swagger-ui-express appears that it does not support $refs. try using 'json-refs' */
const router = require('express').Router()
const { getUsers, getProfile } = require('../controllers/userController.js')
const { authenticateToken } = require('../auth/middleware/authTokenMiddleware.js')
const { roleMiddleware } = require('../auth/middleware/authMiddleware.js')

router.use(authenticateToken)

// Some routes should require admin privileges
router.get('/', roleMiddleware, getUsers)
router.get('/profile', getProfile)

// router.get('/:id', authMiddleware, userController.getUserById)

module.exports = router
