const express = require('express')
const router = express.Router()
const Resource = require('../model/resourceModel')
const jwt = require('jsonwebtoken')
const { isAuth } = require('../middleware/Auth')

router.get('/resource', async (req, res) => {
    try {
        const resource = await Resource.find()
        res.send({resource, status: true})
    } catch (e) {
        res.send({ message: 'Failed to Get Blog Collections', status: false  })
    }
})

router.get('/resource/:id', async (req, res) => {
    try {
        const { id } = req.params
        const resource = await Resource.findById({ _id: id })
        resource ? res.send(resource) : res.send({ message: 'There is no such blog' })
    } catch (e) {
        res.send({ message: 'Failed to Get Blog Detail', status: false })
    }
})

router.post('/resource', async (req, res) => {
    try {
        const { title, description, link, username } = req.body        
        const resource = new Resource({
            title,
            description,
            link,
            username
        })
        await resource.save()
        res.send({message: 'Successfully Saved', status: true})
    } catch (e) {
        res.send({ message: 'Failed to Post Blog', status: false  })
    }
})

router.patch('/resource/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params
        const resource = await Resource.findByIdAndUpdate(id, { ...req.body })
        res.send({ message: 'Successfully Updated!', status: true})
    } catch (e) {
        res.send({ message: 'Failed to Edit Blog', status: false  })
    }
})

router.delete('/resource/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params
        const resource = await Resource.deleteOne({ _id: id })
        res.send({ message: 'Successfully Deleted', status: true})
    } catch (e) {
        res.send({ message: 'Failed to Delete Blog ' + e.message, status: false  })
    }
})

module.exports = router