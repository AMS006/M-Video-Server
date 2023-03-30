const express = require('express')
const { registerUser, loginUser, logoutUser, getUserDetails } = require('../controllers/User')

const router = express.Router()

router.post('/register',registerUser);

router.post('/login',loginUser)

router.get('/logout',logoutUser)

router.get('/me',getUserDetails)

module.exports = router