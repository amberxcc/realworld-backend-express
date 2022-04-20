const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router/index')
const { errHandler, requestTester } = require('./middleware')
const logger = require('./utils/logger')
const { SERVER_PORT } = require('./config')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(requestTester())
app.use(cors())
app.use('/api', router)
app.use(errHandler())

app.listen(SERVER_PORT, () => {
    logger.info(`server start at http://localhost:${SERVER_PORT}`)
})