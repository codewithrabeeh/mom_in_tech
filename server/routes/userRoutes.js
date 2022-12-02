const express = require('express')
const router = express.Router()
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
       
        if (user === null) {
            return res.status(404).json({ message: 'Username not found', status: false })
        }
        
        const comparedPass = await bcrypt.compare(password, user.password)

        if (comparedPass) {

            const token = jwt.sign({ _id: username }, 'secret', { expiresIn: '24h' }) 

            return res.status(200).json({ message: 'Successfully Authenticated', status: true, username, token})
        }

        throw new Error('Failed to Authenticate')

    } catch (e) {
        res.send({ message: 'Failed to Authenticate', status: false })
    }
})

router.post('/register', async (req, res) => {
    try {

        const { email, username, password } = req.body;
        
        const hashPass = await bcrypt.hash(password, 10)
        const user = new User({
            email,
            username,
            password: hashPass
        })
        
        await user.save()
       
        const token = jwt.sign({ _id: username }, 'secret', { expiresIn: '24h' })
        
        res.status(200).json({ message: 'Successfully Registered', status: true, username, token })

    } catch (e) {
        res.status(500).json({ message: 'Failed to Register', status: false })
    }
})

router.post('/logout', async (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({message: 'success'})
})

module.exports = router