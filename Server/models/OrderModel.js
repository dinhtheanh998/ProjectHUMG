const mongoose = require('mongoose')
const { v4 } = require('uuid');

const { Schema } = mongoose

const orDerSchema = new Schema({    
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        requried: true
    },
    address: {
        type: String,
        requried: true
    },
    phone: {
        type: String,
        requried: true
    },
    total: {
        type: Number,
        requried: true,
    },
    state: {
        type: String,
        requried: true,
        default: 'Chờ xác nhận'
    },
    details: {
        type: [],
        requried: true,
    },
    createdDate: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model("Order", orDerSchema);