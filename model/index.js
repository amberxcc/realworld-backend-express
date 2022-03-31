const mongoose = require('mongoose')
const {MONGODB_HOST, MONGODB_PORT, COLLECTION} = require('../config/config')

mongoose.connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${COLLECTION}`, {
    serverSelectionTimeoutMS: 2000
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
}