const validate = require('../middleware/validator')
const {body, param} = require('express-validator')
const { Article, Comment } = require('../model')
const { default: mongoose } = require('mongoose')
const req = require('express/lib/request')

exports.creatArticle = validate([
    body('article.title').notEmpty().withMessage('标题不能为空'),
    body('article.description').notEmpty().withMessage('标题不能为空'),
    body('article.body').notEmpty().withMessage('标题不能为空'),
])

exports.updateArticle = validate([
    body('article.title').notEmpty().withMessage('标题不能为空'),
    body('article.description').notEmpty().withMessage('标题不能为空'),
    body('article.body').notEmpty().withMessage('标题不能为空'),
    param('slug').custom(async id => {
        if(!mongoose.isValidObjectId(id)) return Promise.reject('文章id格式错误')
    })
])

exports.getArticle = validate([
    param('slug').custom(async id => {
        if(!mongoose.isValidObjectId(id)) return Promise.reject('文章id格式错误')
        const target = await Article.findById(id)
        if(!target) return Promise.reject('文章id不存在')
    })
])

exports.deleteArticle = validate([
    param('slug').custom(async (id, {req}) => {
        if(!mongoose.isValidObjectId(id)) return Promise.reject('文章id格式错误')
        const target = await Article.findById(id)
        if(!target) {
            return Promise.reject('文章id不存在') 
        }
    })
])

exports.geComment = validate([
    param('slug').custom(async id => {
        if(!mongoose.isValidObjectId(id)) return Promise.reject('文章id格式错误')
        const target = await Article.findById(id)
        if(!target) return Promise.reject('文章id不存在')
    })
])

exports.deleteComment = validate([
    param('slug').custom(async id => {
        if(!mongoose.isValidObjectId(id)) return Promise.reject('文章id格式错误')
        const target = await Article.findById(id)
        if(!target) return Promise.reject('文章id不存在')
    }),
    param('id').custom(async (id, {req}) => {
        if(!mongoose.isValidObjectId(id)) return Promise.reject('评论id格式错误')
        const target = await Comment.findById(id)
        if(!target) return Promise.reject('评论id不存在')
        req.comment = target
    })
])