const mongoose = require('mongoose')
const baseSchema = require('./base')

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
})

module.exports = userSchema