const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const config = require('./config/config')
const router = require('./router/index')
const errHandler = require('./middleware/err-handler')

const PORT = config.PORT || 3000

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use(errHandler())


app.listen(PORT, ()=>{
    console.log(`server start at http://localhost:${PORT}`)
})