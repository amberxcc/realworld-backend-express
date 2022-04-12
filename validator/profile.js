const validate = require('../middleware/validator')
const { param } = require('express-validator')
const { User } = require('../model')

exports.getProfile = validate([
    param('username')
        .custom(async (username, { req }) => {
            const user = await User.findOne({ username })
            if (user) {
                req.target = user
            } else {
                return (Promise.reject('用户名不存在'))
            }
        }),
])

exports.follow = validate([
    param('username')
        .custom(async (username, { req }) => {
            const user = await User.findOne({ username })
            if (user) {
                req.wantToFollow = user
            } else {
                return (Promise.reject('用户名不存在'))
            }
        }),
])

exports.unfollow = validate([
    param('username')
        .custom(async (username, { req }) => {
            const user = await User.findOne({ username })
            if (user) {
                req.wantToUnfollow = user
            } else {
                return (Promise.reject('用户名不存在'))
            }
        }),
])
