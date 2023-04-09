const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('../../config/db/index');
require('../../config/passport/index')(passport);


class LoginSignupController {

    //[GET] /loginsignup/login
    login(req, res) {
        res.render('login');
    }

    //[POST] /loginsignup/signin
    async signin(req, res, next) {

        let user = await User.findOne({ email: req.body.email });

        if (!user) { //nếu không phải user
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else { //đúng user
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    const token = jwt.sign({ user }, db.secret, { expiresIn: 604800 });

                    res.redirect('/admin/list/user')
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            })
        }

    }

    //[GET] /loginsignup/signup
    signup(req, res) {
        res.render('signup')
    }

    //[post] /loginsignup/signup
    listed(req, res, next) {
        if (req.body.repassword === req.body.password) {//nếu repass = pass thì cho lưu
            const user = new User(req.body);
            user.save()
                .then(() => res.redirect('/admin/list/user'))
                .then(next)
        } else {
            res.send(req.body.repassword)
        }
    }


    getToken = function (headers) {
        if (headers && headers.authorization) {
            const parted = headers.authorization.split(' ');
            if (parted.length == 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

}

module.exports = new LoginSignupController;