const mongoose = require('mongoose')
const baseSchema = require('./base')

const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true, 
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article', 
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    ...baseSchema
}, {versionKey: false})

module.exports = commentSchema