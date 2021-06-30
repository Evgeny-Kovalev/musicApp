const express = require('express')
const authController = require('../controllers/auth')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.put('/signup', authController.putSignup)
router.post('/login', authController.postLogin)
router.post('/me', authMiddleware, authController.postAuthMe)

module.exports = router