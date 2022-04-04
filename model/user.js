const mongoose = require('mongoose')
const baseSchema = require('./base')
const {myHash} = require('../utils/util')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // 必填项
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        set: str => myHash(str), // 存入数据时，先哈希处理
        select: false,
    },
    bio: {
        type: String,
        default: null, 
    },
    image: {
        type: String,
        default: null,
    },
    ...baseSchema,
}, {versionKey: false})

module.exports = userSchema