const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('chatgroup', ChatSchema)