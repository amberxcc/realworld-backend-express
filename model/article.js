const mongoose = require('mongoose')
const baseSchema = require('./base')

const Schema = mongoose.Schema
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    tagList: {
        type: [String],
        default: null,
    },
    favoritesCount: {
        type: Number,
        default: 0,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    },
    ...baseSchema
})

module.exports = articleSchema