const express = require('express')

const router = express.Router()

// 获取用户profile
router.get('/:username', async (request, response)=>{
    response.send(`GET => /api/profiles/:username`)
})

// 关注
router.post('/:username/follow', async (request, response)=>{
    response.send(`POST => /api/profiles/:username/follow`)
})

// 取消关注
router.delete('/:username/follow', async (request, response)=>{
    response.send(`DELETE => /api/profiles/:username/follow`)
})

module.exports = router