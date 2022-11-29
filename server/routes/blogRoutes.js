const express = require('express')
const router = express.Router()
const Blog = require('../model/blogModel')
const jwt = require('jsonwebtoken')
const { isAuth } = require('../middleware/Auth')

router.get('/blog', isAuth, async (req, res) => {
    try {
        const post = await Blog.find()
        res.send({post, status: true})
    } catch (e) {
        res.send({ message: 'Failed to Get Blog Collections', status: false  })
    }
})

router.get('/blog/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById({ _id: id })
        blog ? res.send(blog) : res.send({ message: 'There is no such blog' })
    } catch (e) {
        res.send({ message: 'Failed to Get Blog Detail', status: false })
    }
})

router.post('/blog', isAuth, async (req, res) => {
    try {

        const { title, body, username } = req.body
        const post = new Blog({
            title,
            body,
            username
        })
        await post.save()
    } catch (e) {
        res.send({ message: 'Failed to Post Blog', status: false  })
    }
})

router.patch('/blog/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findByIdAndUpdate(id, { ...req.body })
        res.send({ message: 'Successfully Updated!' })
    } catch (e) {
        res.send({ message: 'Failed to Edit Blog', status: false  })
    }
})

router.delete('/blog/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params
        const post = await Blog.deleteOne({ _id: id })
        res.send({ message: 'Successfully Deleted' })
    } catch (e) {
        res.send({ message: 'Failed to Delete Blog', status: false  })
    }
})

module.exports = router