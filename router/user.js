const express = require('express')

const router = express.Router()

// login
router.post('/user/login', async (request, response) => {
    response.send(`GET => /api/user/login`)
})

// 注册
router.post('/users', async (request, response) => {
    response.send(`POST => /api/users`)
    console.log(request.body)
})

// 获取当前用户信息
router.get('/user', async (request, response) => {
    response.send(`GET => /api/user`)
})

// 更新当前用户信息
router.put('/user', async (request, response) => {
    response.send(`PUT => /api/user`)
})


module.exports = router