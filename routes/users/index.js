const express = require('express')
const validateToken = require('../../middleware/verifyToken');
const updateUser = require('./updateUser');
const router = express.Router()

router.post('/:id', validateToken, updateUser)

module.exports = router;