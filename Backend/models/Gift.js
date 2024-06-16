const mongoose = require('mongoose');

const GiftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    sdf: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Gift', GiftSchema);
