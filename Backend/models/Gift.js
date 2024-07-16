const mongoose = require('mongoose');

// Define the schema for the Gift model
const GiftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    photos: {
        type: [String], // Array of photo URLs or file paths
        required: false,
    },
    highlights: {
        type: [String], // Array of highlight strings
        required: false,
    },
    
    checkedVariants: {
        type: [{
            type: {
                type: String,
                required: true,
            },
            values: {
                type: [String],
                required: true,
            },
        }],
        required: false,
    },
    checkedTags: {
        type: [String], // Array of tags
        required: false,
    },
    selectedCategories: {
        type: [{
            type: {
                type: String,
                required: true,
            },
            values: {
                type: [String],
                required: true,
            },
        }],
        required: false,
    },
});

// Create the model from the schema and export it
module.exports = mongoose.model('Gift', GiftSchema);
