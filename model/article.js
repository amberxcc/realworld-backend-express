const mongoose = require('mongoose')
const {timeSelected} = require('./base')

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
        ref: 'Tag',
    },
    favoritedList: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    ...timeSelected
}, { versionKey: false })

module.exports = articleSchema