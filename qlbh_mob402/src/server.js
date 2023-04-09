const express = require('express');
const path = require("path");
const morgan = require("morgan");
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const router = require('./routers')
const db = require('./config/db');
const passport = require('passport');
const mongoose = require('mongoose')
const cors = require('cors');


const port = 3030;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());
app.use(passport.initialize());

app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')))

db.connect();
//router
router(app);

//Template engine
app.engine('hbs', engine({ extname : '.hbs' , defaultLayout: 'main'}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname , 'resourses/views'));

app.listen(port, () => {
    console.log(`--->App listening at http://localhost:${port}`)
})
