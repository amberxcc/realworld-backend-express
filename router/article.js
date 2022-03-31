const express = require('express')

const router = express.Router()

// 获取所有文章，可使用url查询参数过滤
router.get('/', async (request, response)=>{
    response.send(`GET => /api/articles`)
})

// 获取已关注用户的所有文章，也支持过滤
router.get('/feed', async (request, response)=>{
    response.send(`GET => /api/articles/feed`)
})

// 获取单篇文章
router.get('/:slug', async (request, response)=>{
    response.send(`GET => /api/articles/:slig`)
})

// 创建文章
router.post('/', async (request, response)=>{
    response.send(`POST => /api/articles`)
})

// 修改文章
router.put('/:slug', async (request, response)=>{
    response.send(`PUT => /api/articles/:slug`)
})

// 删除文章
router.delete('/:slug', async (request, response)=>{
    response.send(`DELETE => /api/articles/:slug`)
})

// 新增文章评论
router.post('/:slug/comments', async (request, response)=>{
    response.send(`POST => /api/articles/:slug/comments`)
})

// 获取文章评论
router.get('/:slug/comments', async (request, response)=>{
    response.send(`GET => /api/articles/:slug/comments`)
})

// 删除文章评论
router.delete('/:slug/comments/:id', async (request, response)=>{
    response.send(`DELETE => /api/articles/:slug/comments/:id`)
})

// 收藏文章
router.post('/:slug/favorite', async (request, response)=>{
    response.send(`POST => /api/articles/:slug/favorite`)
})

// 取消收藏
router.delete('/:slug/favorite', async (request, response)=>{
    response.send(`DELETE => /api/articles/:slug/favorite`)
})

module.exports = router