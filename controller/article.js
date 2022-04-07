const { Article, User, Follow, Comment } = require('../model')

/*
 * 1. slug用id来表示，可能导致更新文章后删除所有收藏者的收藏记录
 * 2. 目前获取评论信息api接口不需要认证，没有关注信息（后续可能添加认证版本，增加following字段）
 * 3. 获取单篇文章，不需认证（后续可能添加认证版本，增加following字段）
*/

exports.getAll = async (request, response, next) => {
    try {
        const { limit = 20, offset = 0, tag, author, favorited } = request.query
        const filter = {}
        if (tag) filter.tagList = tag
        if (author) {
            const user = await User.findOne({ username: author })
            filter.author = user ? user._id : null
        }
        let articles = await Article.find(filter)
            .skip(Number(offset))
            .limit(Number(limit))
            .sort({
                creatAt: -1, // 默认返回的数据按照创建时间排序，-1为逆序，1为顺序
            })

        const finalResult = []
        for (let temp of articles) {
            await temp.populate('author')
            await temp.populate('favoritedList')
            let article = temp.toJSON()
            article.slug = article._id
            delete article._id
            article.favoritesCount = article?.favoritedList?.length
            article.favorited = false // getall不验证身份，统统false
            delete article.favoritedList
            finalResult.push(article)
        }

        const articleCount = await Article.countDocuments()
        response.status(200).json({
            articles: finalResult,
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

        const finalResult = []
        for (let temp of articles) {
            articleCount++
            await temp.populate('author')
            await temp.populate('favoritedList')
            let article = temp.toJSON()
            article.slug = article._id
            delete article._id
            article.favoritesCount = article?.favoritedList?.length ?? 0
            article.favorited = false
            for (let user of article.favoritedList) {
                if (request.user.email === user.email) article.favorited = true
            }
            delete article.favoritedList
            finalResult.push(article)
        }

        response.status(200).json({
            articles: finalResult,
            articleCount,
        })
    } catch (err) {
        next(err)
    }
}

exports.getOne = async (request, response, next) => {
    try {
        let article = request.article
        await article.populate('author')
        await article.populate('favoritedList')

        article = article.toJSON()
        let isFavorite = false
        // for (let user of article.favoritedList) {
        //     if (user.email === request.user.email) isFavorite = true
        // }
        article.favoritesCount = article.favoritedList.length
        article.favorited = isFavorite
        delete article.favoritedList
        response.status(200).json({ article })
    } catch (err) {
        next(err)
    }
}

exports.creatOne = async (request, response, next) => {
    try {
        let article = new Article(request.body.article)
        article.author = request.user._id
        await article.populate("author")
        await article.save()

        article = article.toJSON()
        article.slug = article._id
        article.favoritesCount = 0
        article.favorited = false
        delete article._id
        delete article.favoritedList

        response.status(201).json({ article })
    } catch (err) {
        next(err)
    }
}

exports.updateOne = async (request, response, next) => {
    try {
        let article = new Article(request.body.article)
        article.author = request.user._id
        article.populate('author')
        await article.save()
        await Article.deleteOne({ _id: request.params.slug })

        article = article.toJSON()
        article.slug = article._id
        article.favoritesCount = 0
        article.favorited = false
        delete article._id
        delete article.favoritedList

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
        const comments = await Comment.find({ article: request.params.slug })
        for (let comment of comments) {
            await comment.populate('author')
        }
        response.status(200).json({ comments })
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
    try {
        let article = request.article
        await article.populate('favoritedList')

        for (let user of article.favoritedList) {
            if (user.email === request.user.email) {
                return response.status(200).end("已存在")
            }
        }

        article.favoritedList.push(request.user._id)
        await article.save()
        response.status(200).end()
    } catch (err) {
        next(err)
    }
}

exports.unfavorite = async (request, response, next) => {
    try {
        let article = request.article
        await article.populate('favoritedList')
        for (let user of article.favoritedList) {
            if (user.email === request.user.email) {
                article.favoritedList.remove(user)
                await article.save()
            }
        }
        response.status(200).end()
    } catch (err) {
        next(err)
    }
}