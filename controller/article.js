const {Article, User} = require('../model')

exports.getAll = async (request, response, next)=>{
    try{
        const {limit = 20, offset = 0, tag, author} = request.query
        const filter = {}
        
        if(tag) filter.tagList = tag
        if(author){
            const user = await User.findOne({username: author})
            filter.author = user ? user._id : null
        }
        const articles = await Article.find(filter)
            .skip(Number(offset))
            .limit(Number(limit))
            .sort({
                // 默认返回的数据按照创建时间排序，-1为逆序，1为顺序
                creatAt: -1,
            })
        for(let article of articles) article.populate('author')
        const articleCount = await Article.countDocuments()
        response.status(200).json({
            articles,
            articleCount,
        })
    }catch(err){
        next(err)
    }
}

exports.getFeed = async (request, response, next)=>{
    response.send(`GET => /api/articles/feed`)
}

exports.getOne = async (request, response, next)=>{
    try{
        const article = await Article.findById(request.params.slug).populate('author')
        if(!article) response.status(404).end()
        response.status(200).json({article})
    }catch(err){
        next(err)
    }
}

exports.creatOne = async (request, response, next)=>{
    try{
        const article = new Article(request.body.article)
        article.author = request.user._id
        article.populate('author')
        await article.save()
        response.status(201).json({article})
    }catch(err){
        next(err)
    }
}

exports.updateOne = async (request, response, next)=>{
    response.send(`PUT => /api/articles/:slug`)
}

exports.deleteOne = async (request, response, next)=>{
    response.send(`DELETE => /api/articles/:slug`)
}

exports.addComment = async (request, response, next)=>{
    response.send(`POST => /api/articles/:slug/comments`)
}

exports.getComments = async (request, response, next)=>{
    response.send(`GET => /api/articles/:slug/comments`)
}
exports.deleteComment = async (request, response, next)=>{
    response.send(`DELETE => /api/articles/:slug/comments/:id`)
}

exports.favorite = async (request, response, next)=>{
    response.send(`POST => /api/articles/:slug/favorite`)
}

exports.unfavorite = async (request, response, next)=>{
    response.send(`DELETE => /api/articles/:slug/favorite`)
}