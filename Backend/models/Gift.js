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
    variants: {
        sizes: {
            type: [String], // Array of size options
            required: false,
        },
        colors: {
            type: [String], // Array of color options
            required: false,
        },
    },
    checkedVariants: {
        sizes: {
            type: [String], // Array of selected sizes
            required: false,
        },
        colors: {
            type: [String], // Array of selected colors
            required: false,
        },
    },
    checkedTags: {
        type: [String], // Array of tags
        required: false,
    },
    selectedCategories: {
        type: Map,
        of: Boolean, // Map of categories with boolean values indicating selection
        required: false,
    },
});

// Create the model from the schema and export it
module.exports = mongoose.model('Gift', GiftSchema);
