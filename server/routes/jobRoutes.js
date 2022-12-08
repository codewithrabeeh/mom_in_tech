const express = require('express')
const router = express.Router()
const Job = require('../model/jobModel')
const jwt = require('jsonwebtoken')
const { isAuth } = require('../middleware/Auth')

router.get('/job', async (req, res) => {
    try {
        const post = await Job.find().sort({createdAt: -1});
        res.send({post, status: true})
    } catch (e) {
        res.send({ message: 'Failed to Get Blog Collections', status: false  })
    }
})

router.get('/job/:id', async (req, res) => {
    try {
        const { id } = req.params
        const job = await Job.findById({ _id: id })
        job ? res.send(job) : res.send({ message: 'There is no such job' })
    } catch (e) {
        res.send({ message: 'Failed to Get job Detail', status: false })
    }
})

router.post('/job', isAuth, async (req, res) => {
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
        res.send({ message: 'Failed to Post job', status: false  })
    }
})


router.delete('/job/:id', isAuth, async (req, res) => {
    try {
        const { id } = req.params
        const job = await Job.deleteOne({ _id: id })
        res.send({ message: 'Successfully Deleted', status: true})
    } catch (e) {
        res.send({ message: 'Failed to Delete job ' + e.message, status: false  })
    }
})

router.get('/searchjob', async (req, res) => {
    try {
        const {title} = req.query
        const agg = [
            {
                $search: {
                    autocomplete: {
                        query: title,
                        path: 'title',
                        fuzzy: {
                            maxEdits: 1
                        }
                    }
                }
            },
            {
                $limit: 5
            },
            {
                $project: {
                    _id: 1,
                    title: 1,                                         
                }
            }
        ]
  
       const response = await Job.aggregate(agg)
   
    let arr = response.map((obj) => {
        let first = Object.values(obj)[0]
        let second = Object.values(obj)[1]
        return {id: first, name: second}
    })
    
       return res.json(arr)        
    } catch (error) {
        console.log(error.message)
        return res.send('')
    } 
  })

module.exports = router