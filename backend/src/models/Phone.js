const mongoose = require('../db/db')

const PhoneSchema = mongoose.Schema({
    title: String,
    brand: String,
    image: String,
    stock: Number,
    seller: String,
    price: Number,
    reviews: [
        {
            reviewer: String,
            rating: Number,
            Comment: String
        }
    ],
    disabled: {
        type: String,
        default: "disabled"
    }
})

const Phone = mongoose.model('phone', PhoneSchema)

module.exports = Phone