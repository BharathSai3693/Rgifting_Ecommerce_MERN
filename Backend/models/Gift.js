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
        type: Map,
        of: [String], // The values in the map will be arrays of strings
        required: false,
    },
    checkedTags: {
        type: [String], // Array of tags
        required: false,
    },
    selectedCategories: {
        type: Map,
        of: [String], // The values in the map will be arrays of strings
        required: false,
    },
});

// Create the model from the schema and export it
module.exports = mongoose.model('Gift', GiftSchema);
