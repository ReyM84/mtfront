var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema ({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(cb) {
    var user = this;

    if(!user.isModified('password')) return cb();

    brcypt.genSalt(5, function(err, salt) {
        if (err) return cb(err);

        bcrypt.hash(user,password, salt, null, function(err, hash) {
            if (err) return cb(err);
            user.password = hash;
            cb();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);