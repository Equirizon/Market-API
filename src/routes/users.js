const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController.js')

router.post('/', controller.createUser)
router.get('/', controller.getUsers)
router.get('/:id', controller.getUser)

module.exports = router
