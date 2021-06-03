const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema( {
    user_name : {
        type: String,
        require: true
    },
    phone_number : {
        type: String,
        require: true
    },
    password : {
        type: String,
        require: true
    },
    created_at : {
        type: Date,
        default: Date.now
    },
} );

const User = mongoose.model('User', UserSchema);

module.exports = User;