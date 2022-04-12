const express = require('express')
const articleController = require('../controller/article')
const articleValidator = require('../validator/article')
const auth = require('../middleware/auth')

const router = express.Router()

// 获取所有文章，可使用url查询参数过滤
router.get('/', auth({required: false}), articleController.getAll)

// 获取已关注用户的所有文章，也支持过滤
router.get('/feed', auth(), articleController.getFeed)

// 获取单篇文章
router.get('/:slug', auth({required: false}), articleValidator.getArticle, articleController.getOne)

// 创建文章
router.post('/', auth(), articleValidator.creatArticle, articleController.creatOne)

// 修改文章
router.put('/:slug', auth(), articleValidator.updateArticle, articleController.updateOne)

// 删除文章
router.delete('/:slug', auth(), articleValidator.deleteArticle, articleController.deleteOne)

// 新增文章评论
router.post('/:slug/comments', auth(), articleValidator.addComment, articleController.addComment)

// 获取文章评论
router.get('/:slug/comments', auth({required: false}), articleValidator.getComments, articleController.getComments)

// 删除文章评论
router.delete('/:slug/comments/:id', auth(), articleValidator.deleteComment, articleController.deleteComment)

// 收藏文章
router.post('/:slug/favorite', auth(), articleValidator.favorite, articleController.favorite)

// 取消收藏
router.delete('/:slug/favorite', auth(), articleValidator.unfavorite, articleController.unfavorite)

module.exports = router