const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");


// GET route to fetch all menu items
// This route will return all the menu items from the database.
router.get("/", async (req , res) => {
    try {
        const items = await MenuItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// POST route to add a new menu item    
// This route will add a new menu item to the database.

router.post("/addmenu", async (req, res) => {
    const { name, price, description, category } = req.body;


    if (!name || !price || !description || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newItem = new MenuItem({ name, price, description, category });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: "Failed to add menu item" });
    }
});

// POST route to add multiple menu items
// This route will add multiple menu items to the database in one request.

router.post("/addmenus", async (req, res) => {
    const menuItems = req.body;

  
    if (!Array.isArray(menuItems) || menuItems.length === 0) {
        return res.status(400).json({ message: "Request body must be a non-empty array of menu items" });
    }


    for (const item of menuItems) {
        const { name, price, description, category, imageUrl } = item;
        if (!name || !price || !description || !category || !imageUrl) {
            return res.status(400).json({ message: "Each menu item must have name, price, description, category, and imageUrl" });
        }
    }

    try {

        const savedItems = await MenuItem.insertMany(menuItems);
        res.status(201).json(savedItems);
    } catch (error) {
        res.status(500).json({ message: "Failed to add menu items", error: error.message });
    }
});

module.exports = router;