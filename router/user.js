const express = require('express')
const userController = require('../controller/user')

const router = express.Router()

// login
router.post('/user/login', userController.login)

// 注册
router.post('/users', userController.registe)

// 获取当前用户信息
router.get('/user', userController.getUser)

// 更新当前用户信息
router.put('/user', userController.updateUser)


module.exports = router