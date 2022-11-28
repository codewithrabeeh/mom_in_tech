const express = require('express')
const router = express.Router()
const Blog = require('../model/blogModel')

router.get('/blog', async (req, res) => {
    try {
        const post = await Blog.find()
        res.send(post)
    } catch (e) {
        res.send({ message: 'error: ' + e })
    }
})

router.get('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById({ _id: id })
        blog ? res.send(blog) : res.send({ message: 'There is no such blog' })
    } catch (e) {
        res.send({ message: 'error: ' + e })
    }
})

router.post('/blog', async (req, res) => {
    try {
        const { title, body, username } = req.body
        const post = new Blog({
            title,
            body,
            username
        })
        await post.save()
        res.send({ title, body, username })
    } catch (e) {
        res.send({ message: 'Error to post blog' })
    }
})

router.patch('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params
        const blog = await Blog.findByIdAndUpdate(id, { ...req.body })
        res.send({ message: 'Successfully Updated!' })
    } catch (e) {
        res.send({message: 'Error: ' + e})
    }
})

router.delete('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params
        const post = await Blog.deleteOne({ _id: id })
        res.send({ message: 'Successfully Deleted' })
    } catch (e) {
        res.send({ message: 'error: ' + e })
    }
})

module.exports = router