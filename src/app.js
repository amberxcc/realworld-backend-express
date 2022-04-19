const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { SERVER_PORT } = require('./config/config.default')
const router = require('./router/index')
const errHandler = require('./middleware/err-handler')
const requestTester = require('./middleware/request-tester')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(requestTester())

app.use(cors())
app.use('/api', router)
app.use(errHandler())

app.listen(SERVER_PORT, () => {
    console.log(`server start at http://localhost:${SERVER_PORT}`)
})