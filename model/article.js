const mongoose = require('mongoose')
const baseSchema = require('./base')

const articleSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true, 
    },
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
        type: Array,
        default: [],
    },
    favoritesCount: {
        type: Number,
        default: 0,
    },
    author: {
        type: String,
        required: true, 
    },
    ...baseSchema
})

module.exports = articleSchema