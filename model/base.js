const mongoose = require('mongoose')


module.exports = {
    createdAt: {
        type: String,
        default: Date.now,
        select: false,
    },
    updateAt: {
        type: String,
        default: Date.now,
        select: false,
    },
}