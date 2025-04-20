const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name : String,
    phone: String,
    items : [
        {
            name : String,
            price: Number,
            quantity: Number,
            imageUrl: String,
        }
    ],
    totalPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Order', orderSchema);