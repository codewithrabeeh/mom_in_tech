const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const product = require('./product.json')
// const { json } = require('body-parser')

app.get('/', (req, res) => {
    product.push({"name": "sahal"})
    console.log(product)
    res.json(product)
})

app.listen(4000, () => {console.warn('listening')})