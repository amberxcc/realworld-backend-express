const mongoose = require('mongoose')
const baseSchema = require('./base')

const Schema = mongoose.Schema

const followSchema = new mongoose.Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    },
    followed: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    },
    ...baseSchema
}, {versionKey: false})

module.exports = followSchema