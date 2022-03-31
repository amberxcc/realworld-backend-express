const validate = require('../middleware/validator')
const {body} = require('express-validator')
const {User} = require('../model')

exports.registe = validate([
    body('user.username')
        .notEmpty().withMessage('用户名不能为空'),
    
    body('user.password')
        .notEmpty().withMessage('密码不能为空'),

    body('user.email')
        .notEmpty().withMessage('email不能为空')
        .isEmail().withMessage('email格式不正确')
        .bail()
        .custom(async email => {
            const user = await User.findOne({email})
            if(user){
                return(Promise.reject('邮箱已存在'))
            }
        })
])