const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


// Create new order

router.post('/', async (req, res) => {
    const {name , phone , items , totalPrice} = req.body;

    if(!name || !phone || !items || !totalPrice) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const order = new Order({
            name,
            phone,
            items,
            totalPrice
        });

        await order.save();
        res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get Order History by phone

router.get('/:phone', async (req, res) => {
    try {
      const orders = await Order.find({ phone: req.params.phone });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;