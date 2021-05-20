//maintenance-app /models.Item.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const ItemScema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    priority: {
        type: String,
        default: "Low"
    },
    status: {
        type: String,
        default: "Submitted"
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    submitDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemScema);
