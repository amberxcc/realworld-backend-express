const mongoose = require('mongoose')


module.exports = {
    createdAt: {
        type: String,
        default: Date.now
    },
    updateAt: {
        type: String,
        default: Date.now
    },
}