const mongoose = require('mongoose')
const {timeSelected} = require('./base')

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
    ...timeSelected
}, {versionKey: false})

module.exports = followSchema