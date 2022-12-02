const express = require('express')
const router = express.Router()
const Job = require('../model/jobModel')
const jwt = require('jsonwebtoken')
const { isAuth } = require('../middleware/Auth')

router.get('/job', async (req, res) => {
    try {
        const post = await Job.find()
        res.send({post, status: true})
    } catch (e) {
        res.send({ message: 'Failed to Get Blog Collections', status: false  })
    }
})

router.get('/job/:id', async (req, res) => {
    try {
        const { id } = req.params
        const job = await Job.findById({ _id: id })
        job ? res.send(job) : res.send({ message: 'There is no such blog' })
    } catch (e) {
        res.send({ message: 'Failed to Get Blog Detail', status: false })
    }
})

router.post('/job', async (req, res) => {
    try {
        const { title, description, email, username } = req.body        
        const job = new Job({
            title,
            description,
            email,
            username
        })
        await job.save()
        res.send({message: 'Successfully Saved', status: true})
    } catch (e) {
        res.send({ message: 'Failed to Post Blog', status: false  })
    }
})

router.patch('/job/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params
        const job = await Job.findByIdAndUpdate(id, { ...req.body })
        res.send({ message: 'Successfully Updated!', status: true})
    } catch (e) {
        res.send({ message: 'Failed to Edit Blog', status: false  })
    }
})

router.delete('/job/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params
        const job = await Job.deleteOne({ _id: id })
        res.send({ message: 'Successfully Deleted', status: true})
    } catch (e) {
        res.send({ message: 'Failed to Delete Blog ' + e.message, status: false  })
    }
})

module.exports = router