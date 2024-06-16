const express = require('express');
const router = express.Router();
const Gift = require('../models/Gift');

// Get all gifts
router.get('/', async (req, res) => {
    try {
        const gifts = await Gift.find();
        res.json(gifts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const { name, email, sdf } = req.body;
    const user = new Gift({ name, email, sdf });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Export the router
module.exports = router;
