const mongoose = require('mongoose')
const {MONGODB_HOST, MONGODB_PORT, COLLECTION, dbTimeout} = require('../config/config')

console.log(`准备连接mongodb数据库(dbTimeout ${dbTimeout}): ${MONGODB_HOST}:${MONGODB_PORT}/${COLLECTION}`)
mongoose.connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${COLLECTION}`, {
    serverSelectionTimeoutMS: dbTimeout
})
.then(() => {
    console.log(`mongodb connected: ${MONGODB_HOST}:${MONGODB_PORT}/${COLLECTION}`)
}).catch( err =>{
    console.log(`mongodb connect fail: ${MONGODB_HOST}:${MONGODB_PORT}/${COLLECTION}`, err)
    process.exit(1)
}
)

module.exports = {
    User: mongoose.model('User', require('./user')),
    Article: mongoose.model('Article', require('./article')),
    Follow: mongoose.model('Follow', require('./follow')),
    Comment: mongoose.model('Comment', require('./comment')),
}