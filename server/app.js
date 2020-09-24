require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')
const errHandler = require('./middlewares/errHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)
app.use(errHandler)

// app.listen(port, (req,res) => {
//     console.log(`listen on port ${port}`)
// })

module.exports = app