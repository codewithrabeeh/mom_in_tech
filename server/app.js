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

app.use('/', userRoutes)
app.use('/', blogRoutes)

app.listen(4000, () => { console.log('Listening to 4000') })