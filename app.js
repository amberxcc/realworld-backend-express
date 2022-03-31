const express = require('express')
const config = require('./config')

const PORT = config.PORT || 3000

const app = express()

app.get('/', (request, response)=>{
    response.send(`Hello, world`)
})


app.listen(PORT, ()=>{
    console.log('server start at http://localhost:3000')
})