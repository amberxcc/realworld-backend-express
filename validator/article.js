const validate = require('../middleware/validator')
const { body, param } = require('express-validator')
const { Article, Comment } = require('../model')
const { mongoose } = require('mongoose')

exports.creatArticle = validate([
    body('article.title').notEmpty().withMessage('标题不能为空'),
    body('article.description').notEmpty().withMessage('标题不能为空'),
    body('article.body').notEmpty().withMessage('标题不能为空'),
])

exports.getArticle = validate([
    param('slug').custom(async (slug, { req }) => {
        const target = await Article.findOne({ slug })
        if (!target) return Promise.reject('slug不存在')
        req.target = target
    })
])

exports.updateArticle = validate([
    param('slug').custom(async (slug, { req }) => {
        const target = await Article.findOne({ slug })
        if (!target)
            return Promise.reject('文章slug不存在')
        else
            req.target = target 
            
    })
])

exports.deleteArticle = validate([
    param('slug').custom(async (slug, { req }) => {
        const target = await Article.findOne({ slug })
        if (!target) return Promise.reject('slug不存在')
        req.target = target
    })
])

exports.addComment = validate([
    body('comment.body').notEmpty().withMessage('评论不能为空'),
    param('slug').custom(async (slug, { req }) => {
        const targetArticle = await Article.findOne({ slug })
        if (!targetArticle) return Promise.reject('slug不存在')
        req.targetArticle = targetArticle
    })
])


exports.getComments = validate([
    param('slug').custom(async (slug, { req }) => {
        const target= await Article.findOne({ slug })
        
        if (!target) return Promise.reject('slug不存在')
        req.target = target
    })
])

exports.deleteComment = validate([
    param('slug').custom(async (slug, { req }) => {
        const targetArticle = await Article.find({ slug })
        if (!targetArticle) return Promise.reject('slug不存在')
        req.targetArticle = targetArticle
    }),
    param('id').custom(async (id, { req }) => {
        if (!mongoose.isValidObjectId(id)) return Promise.reject('评论id格式错误')
        const targetComment = await Comment.findById(id)
        if (!targetComment) return Promise.reject('评论id不存在')
        req.targetComment = targetComment
    })
])

exports.favorite = validate([
    param('slug').custom(async (slug, { req }) => {
        const target = await Article.findOne({ slug })
        if (!target) return Promise.reject('slug不存在')
        req.target = target
    })
])

exports.unfavorite = validate([
    param('slug').custom(async (slug, { req }) => {
        const target = await Article.findOne({ slug })
        if (!target) return Promise.reject('slug不存在')
        req.target = target
    })
])