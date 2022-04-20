const mongoose = require('mongoose')
const { MONGODB_HOST, MONGODB_PORT, COLLECTION, DB_TIMEOUT } = require('../config')
const User = require('./user')
const Article = require('./article')
const Comment = require('./comment')
const logger = require('../utils/logger')


const url = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${COLLECTION}`
const option = { serverSelectionTimeoutMS: DB_TIMEOUT }

logger.info(`准备连接到mongodb数据库(超时时间 ${DB_TIMEOUT}ms): ${url}`)

mongoose.connect(url, option)
    .then(() => {
        logger.info(`mongodb connected: ${url}`)
    }).catch(err => {
        logger.error(`mongodb connect fail: ${url}`, err)
        process.exit(1)
    })


module.exports = {
    User,
    Article,
    Comment
}