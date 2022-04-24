const mongoose = require('mongoose')
const { MONGODB_URL, MONGODB_OPTION } = require('../config')
const User = require('./user')
const Article = require('./article')
const Comment = require('./comment')
const logger = require('../utils/logger')


logger.info(`准备连接到mongodb数据库: ${MONGODB_URL}`)
mongoose.connect(MONGODB_URL, MONGODB_OPTION)
    .then(() => {
        logger.info(`mongodb connected: ${MONGODB_URL}`)
    }).catch(errors => {
        logger.error(`mongodb connect fail: ${MONGODB_URL}`, errors)
        process.exit(1)
    })


module.exports = {
    User,
    Article,
    Comment
}