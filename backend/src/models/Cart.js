const mongoose = require('../db/db')

const CartSchema = mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    phoneDetail:{
        phondId: {
            type: String,
            unique: true
        },
        phondSate: {
            type: Boolean,
            default: false
        },
        num: Number
    }
})

const Cart = mongoose.model('cart', CartSchema)

module.exports = Cart