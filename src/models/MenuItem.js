const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name : String,
    category: String,
    description: String,
    price: Number,
    imageUrl: String,
})

module.exports = mongoose.model('MenuItem', menuItemSchema);