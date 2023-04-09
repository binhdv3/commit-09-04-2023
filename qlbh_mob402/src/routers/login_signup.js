const express = require('express');
const router = express.Router();

const loginsignupController = require('../app/controllers/LoginSignupController');
const passport = require('passport')

router.get('/login', loginsignupController.login)
router.get('/signup', loginsignupController.signup)
router.post('/list', loginsignupController.listed)//post signup
router.post('/signin', loginsignupController.signin)//post signin

module.exports = router;