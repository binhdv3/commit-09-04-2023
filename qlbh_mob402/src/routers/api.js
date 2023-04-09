const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const db = require('../config/db/index'); //database
const pp = require('../config/passport/index'); //passport
const passport = require('passport');
const express = require('express');

const router = express.Router();
const User = require('../app/models/User')

