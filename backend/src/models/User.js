const mongoose = require('../db/db')

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String
})

const User = mongoose.model('user', UserSchema)

module.exports = User