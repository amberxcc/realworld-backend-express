const { Article, User, Follow, Comment } = require('../model')

exports.getAll = async (request, response, next) => {
    try {
        const { limit = 20, offset = 0, tag, author, favorited } = request.query
        const filter = {}

        if (tag) filter.tagList = tag
        if (author) {
            const user = await User.findOne({ username: author })
            filter.author = user ? user._id : null
        }
        const articles = await Article.find(filter)
            .skip(Number(offset))
            .limit(Number(limit))
            .sort({
                // 默认返回的数据按照创建时间排序，-1为逆序，1为顺序
                creatAt: -1,
            })
        for (let article of articles) {
            article.populate('author')
        }
        const articleCount = await Article.countDocuments()
        response.status(200).json({
            articles,
            articleCount,
        })
    } catch (err) {
        next(err)
    }
}

exports.getFeed = async (request, response, next) => {
    try {
        let articleCount = 0
        const { limit = 20, offset = 0 } = request.query
        const followedList = await Follow.find({ follower: request.user._id })
        const filterList = []

        for (let i of followedList) {
            filterList.push(i.followed)
        }
        const articles = await Article.find({ author: { $in: filterList } })
            .skip(Number(offset))
            .limit(Number(limit))
            .sort({ creatAt: -1 })

        for (let article of articles) {
            article.populate('author')
            articleCount++
        }
        response.status(200).json({
            articles,
            articleCount,
        })
    } catch (err) {
        next(err)
    }
}

exports.getOne = async (request, response, next) => {
    try {
        const article = await Article.findById(request.params.slug).populate('author')
        if (!article) response.status(404).end()
        response.status(200).json({ article })
    } catch (err) {
        next(err)
    }
}

exports.creatOne = async (request, response, next) => {
    try {
        const article = new Article(request.body.article)
        article.author = request.user._id
        article.populate('author')
        await article.save()
        response.status(201).json({ article })
    } catch (err) {
        next(err)
    }
}

exports.updateOne = async (request, response, next) => {
    try {
        const article = new Article(request.body.article)
        article.author = request.user._id
        article.populate('author')
        await article.save()
        await Article.deleteOne({ _id: request.params.slug })
        response.status(201).json({ article })
    } catch (err) {
        next(err)
    }
}

exports.deleteOne = async (request, response, next) => {
    await Article.deleteOne({ _id: request.params.slug })
    response.status(200).end()

}

exports.addComment = async (request, response, next) => {
    try {
        console.log(request.params.slug)
        let comment = new Comment({
            body: request.body.comment.body,
            article: request.params.slug,
            author: request.user._id,
        })
        await comment.populate('author')
        await comment.save()

        comment = comment.toJSON()
        comment.id = comment._id
        delete comment._id
        delete comment.article
        response.status(201).json({ comment })
    } catch (err) {
        next(err)
    }

}

exports.getComments = async (request, response, next) => {
    try {
        const comment = await Comment.find({ article: request.params.slug })
        for (let c of comment) {
            await c.populate('author')
        }
        response.status(200).json({ comment })
    } catch (err) {
        next(err)
    }
}

exports.deleteComment = async (request, response, next) => {
    try {
        if (request.comment.author._id.toString() !== request.user._id.toString()) {
            response.status(403).end()
        } else {
            await Comment.deleteOne({ _id: request.params.id })
            response.status(200).end()
        }
    } catch (err) {
        next(err)
    }
}

exports.favorite = async (request, response, next) => {
    response.send(`POST => /api/articles/:slug/favorite`)
}

exports.unfavorite = async (request, response, next) => {
    response.send(`DELETE => /api/articles/:slug/favorite`)
}