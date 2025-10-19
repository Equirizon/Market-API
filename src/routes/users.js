/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users/Auth
 *     summary: Get all users (admin only)
 *     description: Gets all existing users from the DB
 *     operationId: getUsers
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/Users/responses/200'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 * /users/profile:
 *   get:
 *     tags:
 *       - Users/Auth
 *     summary: Gets own profile
 *     description: Get the profile of the authenticated user
 *     operationId: getProfile
 *     security:
 *       - JWTAuth: []
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/Users/Profile/responses/200'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
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
