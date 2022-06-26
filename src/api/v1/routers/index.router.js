const express = require('express')
const router = express.Router()


const {
    registerUser, 
    verifyOTP
} = require('../controllers/user.controller')


router.post('/v1/api/register', registerUser)
router.post('/v1/api/verify-otp',verifyOTP)

module.exports = router
