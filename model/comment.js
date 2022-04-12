const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
    body: {
        type: String,
        required: true, 
    },
    article: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
}, {versionKey: false, timestamps: true})

module.exports = model('Comment', commentSchema)