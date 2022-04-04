const validate = require('../middleware/validator')
const { body } = require('express-validator')
const { User } = require('../model')
const { myHash } = require('../utils/util')
const { userProperty, userPropertyNotEmpty } = require("../utils/user")

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

// 利用中间件的特性将validate的执行逻辑分开，相当于顺序验证
exports.login = [validate([
    body('user.email')
        .notEmpty().withMessage('email不能为空'),
    body('user.password')
        .notEmpty().withMessage('密码不能为空'),

]), validate([
    body('user.email')
        .custom(async (email, { req }) => { // 将req对象解构出来（见mongoose文档）
            // 如果schema中设置了select:false，则默认查询不到，需要手动选择字段
            const user = await User.findOne({ email }).select(["password", "username", "email", "bio", "image"])
            if (!user) {
                return (Promise.reject('email不存在'))
            } else {
                req.user = user  // 如果用户存在，挂载到request对象上，方便后续处理
            }
        })
]), validate([
    body('user.password')
        .custom(async (password, { req }) => {
            if (myHash(password) !== req.user.password) return Promise.reject('密码错误')
        })
])]

exports.update = [validate([
    body('user')
        .custom(async (user, { req }) => {
            for (let k in user) {
                if (!userProperty.has(k)) return Promise.reject(`非法属性：${k}`)
            }
        })
        .custom(async (user, { req }) => {
            for (let k in user) {
                if (userPropertyNotEmpty.has(k) && !user[k]) return Promise.reject(`${k}不能为空`)
            }
        }),
    body('user')
        .custom(async (user, { req }) => {
            for (let k in user) {
                if (k === 'username') {
                    const _user = await User.findOne({ username: user[k] })
                    if (_user) return Promise.reject('用户名已存在')
                }
                req.user[k] = user[k]
            }
        })
        .custom(async (user, { req }) => {
            for (let k in user) {
                if (k === 'email') {
                    const _user = await User.findOne({ email: user[k] })
                    if (_user) return Promise.reject('email已存在')
                    if (!user[k].match(/^\w+@\w+\.\w+$/i)) throw new Error('email格式错误')
                }
                req.user[k] = user[k]
            }
        })
])]