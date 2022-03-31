const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const config = require('./config')

const PORT = config.PORT || 3000

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.get('/', (request, response)=>{
    response.send(`Hello, world`)
})

app.post('/', (request, response)=>{
    response.send(request.body)
})


app.listen(PORT, ()=>{
    console.log('server start at http://localhost:3000')
})