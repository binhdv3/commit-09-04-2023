const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');
const passport = require('passport');

router.get('/list/user',passport.authenticate('jwt', {session: false}) ,  adminController.listUser);

//
module.exports = router;