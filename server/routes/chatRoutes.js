const express = require('express')
const router = express.Router()
const Chat = require('../model/chatModel')
const jwt = require('jsonwebtoken')
const { isAuth } = require('../middleware/Auth')

router.post('/chat', async (req, res) => {
    try {
        const { message, username } = req.body
        const chat = new Chat({
            message,
            username
        })
        await chat.save()
        res.send({ message: 'Successfully Saved', status: true })
    } catch (e) {
        res.send({ message: 'Failed to Post Event ' + e.message, status: false })
    }
})

router.get('/chat', async (req, res) => {
    try {
        const chat = await Chat.find()
        res.send({ chat, status: true })
    } catch (e) {
        res.send({ message: 'Failed to Post Event', status: false })
    }
})

router.get('/chatlast', async (req, res) => {
    try {
        const chat = await Chat.aggregate.limit(5)
        res.send({chat})
    } catch (e) {
        res.send({ message: 'Failed to Get Event', status: false })
    }
})

module.exports = router