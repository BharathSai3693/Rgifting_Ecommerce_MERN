const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for the Gift model
const SettingsSchema = new mongoose.Schema({
    settingType: {
        type: String,
        required: true,
    },
    settings: {
        type: Schema.Types.Mixed,
        required: true,
    }
});

// Create the model from the schema and export it
module.exports = mongoose.model('Setting', SettingsSchema);
