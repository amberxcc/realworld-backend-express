const express = require('express')

const router = express.Router()

// 获取tags
router.get('/tags', async (request, response)=>{
    response.send(`GET => /api/tags`)
})


module.exports = router