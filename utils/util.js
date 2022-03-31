const crypto = require('crypto')
const {SECRET_KEY} = require('../config/config')

const key = SECRET_KEY || 'secret'

exports.myHash = str => {
    return crypto.createHmac('md5', key).update(str).digest('hex')
}