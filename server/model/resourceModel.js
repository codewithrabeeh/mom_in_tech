const mongoose = require('mongoose')

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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
})

module.exports = mongoose.model('resource', ResourceSchema)