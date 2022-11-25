const express = require('express')
const router = express.Router()
const User = require('../model/userModel')


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (user === null) {
            return res.send({ message: 'Username not found' })
        }
        if (user.password === password) {
            return res.send({ message: 'Successfully Authenticated' })
        }
        throw new Error('Failed to Authenticate')
    } catch (e) {
        res.send({ status: 'error', message: e.message })
    }
})

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({
            email,
            username,
            password
        })
        await user.save()
        res.json({ message: 'Successfully Registered' })

    } catch (e) {
        res.json({ message: 'error', message: e.message })
    }
})

module.exports = router