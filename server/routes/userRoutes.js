const express = require('express')
const router = express.Router()
const User = require('../model/userModel')


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (user === null) {
            return res.status(404).json({ message: 'Username not found', status: false })
        }
        if (user.password === password) {
            return res.status(200).json({ message: 'Successfully Authenticated', status: true, username })
        }
        throw new Error('Failed to Authenticate')
    } catch (e) {
        res.send({ message: 'Failed to Authenticate', status: false })
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
        res.status(200).json({ message: 'Successfully Registered', status: true, username })

    } catch (e) {
        res.status(500).json({ message: 'error', message: e.message, status: false })
    }
})

module.exports = router