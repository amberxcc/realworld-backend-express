const validate = require('../middleware/validator')
const { body } = require('express-validator')
const { User } = require('../model')
const { myHash } = require('../utils/util')


exports.registe = validate([
    body('user.username')
        .notEmpty().withMessage('用户名不能为空')
        .custom(async username => {
            const user = await User.findOne({ username }).exec()
            if (user) {
                return (Promise.reject('用户名已存在'))
            }
        }),
    body('user.password')
        .notEmpty().withMessage('密码不能为空'),
    body('user.email')
        .notEmpty().withMessage('email不能为空')
        .isEmail().withMessage('email格式不正确')
        .bail()
        .custom(async email => {
            const user = await User.findOne({ email })
            if (user) {
                return (Promise.reject('邮箱已存在'))
            }
        })
])


exports.login = [validate([
    body('user.email')
        .notEmpty().withMessage('email不能为空'),
    body('user.password')
        .notEmpty().withMessage('密码不能为空'),

]), validate([
    body('user')
        .custom(async (user, { req }) => { 
            const target = await User.findOne({ email: user.email })
            if (!target) {
                return (Promise.reject('email不存在'))
            } else {
                console.log(user.password,' -- ',target)
                if (myHash(user.password) !== target.password) return Promise.reject('密码错误')
                req.user = target 
            }
        })
])]


// 也可以在前端验证数据
exports.update = [validate([
    body('user')
        .custom(async (user, { req }) => {
            for (let k in user) {
                if (k === 'username') {
                    const target = await User.findOne({ username: user[k] })
                    if (target) return Promise.reject('用户名已存在')
                }
            }
        }),
    body('user')
        .custom(async (user, { req }) => {
            for (let k in user) {
                if (k === 'email') {
                    const _user = await User.findOne({ email: user[k] })
                    if (_user) return Promise.reject('email已存在')
                    if (!user[k].match(/^\w+@\w+\.\w+$/i)) throw new Error('email格式错误')
                }
            }
        }),
])]