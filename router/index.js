const express = require('express')
const user = require('./user')
const profile = require('./profile')
const article = require('./article')
const tag = require('./tag')

const router = express.Router()

router.get('/test', async(requset, resonse, next) => {
    try{
        throw new Error('test err')
        resonse.end('GET => for test...')
    }catch(err){
        next(err)
    }
})

router.use(user)
router.use('/profiles', profile)
router.use('/articles',article)
router.use('/tags', tag)


module.exports = router