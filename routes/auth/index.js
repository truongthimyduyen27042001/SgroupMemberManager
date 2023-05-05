const express = require('express')
const router = express.Router()
const validateRegister = require('../../middleware/validateRegister')
const validateLogin = require('../../middleware/validateLogin')
const register = require('./register')
const login = require('./login')

router.post('/auth/register', validateRegister, register)
router.post('/auth/login', validateLogin, login)
module.exports = router;