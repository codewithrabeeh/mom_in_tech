require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { json } = require('body-parser')
const dbUrl = process.env.DB_URL
mongoose.connect(dbUrl).then(() => console.log('DB Connected'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
const jobRoutes = require('./routes/jobRoutes')
const eventRoutes = require('./routes/eventRoutes')
const chatRoutes = require('./routes/chatRoutes')

app.use('/', userRoutes)  
app.use('/', blogRoutes) 
app.use('/', jobRoutes)
app.use('/', eventRoutes)
app.use('/', chatRoutes)

app.listen(4005, () => { console.log('Listening to 4005') })