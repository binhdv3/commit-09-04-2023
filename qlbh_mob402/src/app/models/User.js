const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const bcrypt = require('bcrypt-nodejs');
mongoose.plugin(slug);

const User = new mongoose.Schema({
    name: { type: String, require: true },
    adress: { type: String },
    password: { type: String },
    email: { type: String },
    token: {type: String, require: true},
    slug: {type: String, slug : 'name'},
}, { 
    timestamps: true,
});

User.pre('save', function(next){
    const user = this;
    if(this.isModified('password') || this.isNew){
        bcrypt.genSalt(10, (err, salt) => {
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password, salt,null, (err, hash) => {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }else{
        return next();
    }
})

User.methods.comparePassword = function(passw, cb){
    bcrypt.compare(passw, this.password, function(err, isMatch){
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });  
}

module.exports = mongoose.model('User', User);