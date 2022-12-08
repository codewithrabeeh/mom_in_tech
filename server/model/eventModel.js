const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('event', EventSchema)