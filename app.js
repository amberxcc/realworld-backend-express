const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const {SERVER_PORT} = require('./config/config')
const router = require('./router/index')
const errHandler = require('./middleware/err-handler')

const PORT = SERVER_PORT || 3000

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(async (req, res, next)=>{
    console.log(req.body)
    console.log(req.params)
    next()
})

app.use(cors())
app.use('/api', router)
app.use(errHandler())


app.listen(PORT, ()=>{
    console.log(`starting server at http://localhost:${PORT}`)
})