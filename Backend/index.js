require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
console.log(process.env.MONGO_URI)
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.use('/api/gifts', require('./routes/gifts'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
