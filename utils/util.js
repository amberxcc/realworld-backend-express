const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const {SECRET_KEY, TOKEN_TIME} = require('../config/config')

const key = SECRET_KEY || 'secret'
const tokenTime = TOKEN_TIME || 60*60*60

exports.myHash = str => {
    return crypto.createHmac('md5', key).update(str).digest('hex')
}

exports.jwtSign = jsonData => {
    return jwt.sign(jsonData, key, {expiresIn: tokenTime})
}

exports.jwtVerify = token => {
    return jwt.verify(token, key)
}

exports.jwtDecode = token => {
    return jwt.decode(token)
}