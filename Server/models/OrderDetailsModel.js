const mongoose = require('mongoose')
const { v4 } = require('uuid');

const { Schema } = mongoose

const orDerDetailsSchema = new Schema({    
    idOrder: {
        type: Schema.Types.ObjectId,
        ref:"Order",
        required: true,
    },
    idProduct: {
        type: Schema.Types.ObjectId,
        ref:"product",
        requried: true
    },
    quantity: {
        type: Number,        
        requried: true
    },
    uniPrice: {
        type: String,
        requried: true
    },
    unitPro: {
        type: Number,
        requried: true
    },
    unitPromotionalPrice: {
        type: Number,
        requried: true
    },
    total: {
        type: Number,
        requried: true,
    },   
    createdDate: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model("OrderDetails", orDerDetailsSchema);