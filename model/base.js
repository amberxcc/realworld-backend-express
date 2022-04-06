const mongoose = require('mongoose')


module.exports.timeSelected = {
    createdAt: {
        type: String,
        default: Date.now,
    },
    updateAt: {
        type: String,
        default: Date.now,
    },
}

module.exports.timeUnSelected = {
    createdAt: {
        type: String,
        default:Date.now,
        select: false,
    },
    updateAt: {
        type: String,
        default: Date.now,
        select: false,
    },
}