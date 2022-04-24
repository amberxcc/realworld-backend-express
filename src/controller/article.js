const { Article, User, Comment } = require('../model')
const { slugify } = require('../utils/util')


exports.getOne = async (request, response, next) => {
    try {
        const target = request.target
        const author = await User.findOne({ _id: target.author })
        let following = false

        if (request.user) {
            following = author.isFollower(request.user.id)
        }

        const article = {
            slug: target.slug,
            title: target.title,
            description: target.description,
            body: target.body,
            tagList: target.tagList,
            createdAt: target.createdAt,
            updatedAt: target.updatedAt,
            favorited: target.isFavorite(request.user.id),
            favoritesCount: target.getFavoriteCount(),
            atuhor: {
                username: author.username,
                bio: author.bio,
                image: author.image,
                following
            },
        }

        response.status(200).json({ article })
    } catch (err) {
        next(err)
    }
}


exports.creatOne = async (request, response, next) => {
    try {
        const newArticle = new Article({
            ...request.body.article, // 任何Schema中未定义的键/值总是被忽略
            author: request.user._id,
            slug: slugify(request.body.article.title)
        })
        await newArticle.save()

        const author = request.user
        const article = {
            slug: newArticle.slug,
            title: newArticle.title,
            description: newArticle.description,
            body: newArticle.body,
            tagList: newArticle.tagList,
            createdAt: newArticle.createdAt,
            updatedAt: newArticle.updatedAt,
            favorited: false,
            favoritesCount: 0,
            atuhor: {
                username: author.username,
                bio: author.bio,
                image: author.image,
                following: author.isFollower(author.id)
            },
        }

        console.log(newArticle,article)

        response.status(201).json({ article })
    } catch (err) {
        next(err)
    }
}


exports.updateOne = async (request, response, next) => {
    try {
        const target = request.target
        const author = await User.findOne({ _id: target.author })
        let following = false

        console.log(request.body.article)
        for (let i in request.body.article) {
            target[i] = request.body.article[i]
            if (i === 'title') target.slug = slugify(target[i])
        }
        await target.save()

        if (request.user) {
            following = author.isFollower(request.user.id)
        }

        const article = {
            slug: target.slug,
            title: target.title,
            description: target.description,
            body: target.body,
            tagList: target.tagList,
            createdAt: target.createdAt,
            updatedAt: target.updatedAt,
            favorited: target.isFavorite(request.user.id),
            favoritesCount: target.getFavoriteCount(),
            atuhor: {
                username: author.username,
                bio: author.bio,
                image: author.image,
                following
            },
        }

        response.status(201).json({ article })
    } catch (err) {
        next(err)
    }
}


exports.deleteOne = async (request, response, next) => {
    if (request.user.id === request.target.author.toString()) {
        await Article.deleteOne({ slug: request.params.slug })
        response.status(204).end()
    } else {
        response.status(403).end()
    }
}


exports.getAll = async (request, response, next) => {
    try {
        const { limit = 20, offset = 0, tag, author, favorited } = request.query
        const filter = {}
        if (tag) filter.tagList = tag
        if (favorited) filter.favoritedList = favorited
        if (author) {
            const user = await User.findOne({ username: author })
            filter.username = user ? user._id : null
        }

        const findResults = await Article.find(filter)
            .skip(Number(offset))
            .limit(Number(limit))
            .sort({
                creatAt: -1, // 默认返回的数据按照创建时间排序，-1为逆序，1为顺序
            })

        const articles = []
        for (let target of findResults) {
            const author = await User.findOne({ _id: target.author })
            let following = false

            console.log('user:', request.user)
            if (request.user) {
                following = author.isFollower(request.user.id)
            }

            const article = {
                slug: target.slug,
                title: target.title,
                description: target.description,
                body: target.body,
                tagList: target.tagList,
                createdAt: target.createdAt,
                updatedAt: target.updatedAt,
                favorited: request.user ? target.isFavorite(request.user.id) : false,
                favoritesCount: target.getFavoriteCount(),
                author: {
                    username: author.username,
                    bio: author.bio,
                    image: author.image,
                    following
                },
            }
            articles.push(article)
        }

        const articleCount = await Article.countDocuments()
        response.status(200).json({ articles, articleCount })
    } catch (err) {
        next(err)
    }
}


exports.getFeed = async (request, response, next) => {
    try {
        let articleCount = 0
        const { limit = 20, offset = 0 } = request.query
        const findResults = await Article.find({})
            .skip(Number(offset))
            .limit(Number(limit))
            .sort({
                creatAt: -1, // 默认返回的数据按照创建时间排序，-1为逆序，1为顺序
            })

        const articles = []
        for (let target of findResults) {
            const author = await User.findById(target.author)
            if (!author.followers.includes(request.user.id)) continue

            let following = false
            if (request.user) {
                following = author.isFollower(request.user.id)
            }

            const article = {
                slug: target.slug,
                title: target.title,
                description: target.description,
                body: target.body,
                tagList: target.tagList,
                creatAt: target.createdAt,
                updateAt: target.updateAt,
                favorited: target.isFavorite(request.user.id),
                favoritesCount: target.getFavoriteCount(),
                atuhor: {
                    username: author.username,
                    bio: author.bio,
                    image: author.image,
                    following
                },
            }
            articles.push(article)
            articleCount++
        }

        response.status(200).json({ articles, articleCount })
    } catch (err) {
        next(err)
    }
}


exports.addComment = async (request, response, next) => {
    try {
        const newComment = new Comment({
            body: request.body.comment.body,
            article: request.targetArticle.id,
            author: request.user.id,
        })
        await newComment.save()

        const author = request.user
        const comment = {
            id: newComment.id,
            creatAt: newComment.creatAt,
            updateAt: newComment.updateAt,
            body: newComment.body,
            author: {
                username: author.username,
                bio: author.bio,
                image: author.image,
                following: author.isFollower(author.id)
            }
        }

        response.status(201).json({ comment })
    } catch (err) {
        next(err)
    }

}


exports.getComments = async (request, response, next) => {
    try {
        const comments = []
        const findComments = await Comment.find({ article: request.target.id })
        for (let _comment of findComments) {
            
            const author = await User.findOne({id: _comment.author})
            let following = false

            if(request.user){
                following = author.isFollower(request.user.id)
            }

            const comment = {
                id: _comment.id,
                creatAt: _comment.creatAt,
                updateAt: _comment.updateAt,
                body: _comment.body,
                author: {
                    username: author.username,
                    bio: author.bio,
                    image: author.image,
                    following
                }
            }
            comments.push(comment)
        }
        response.status(200).json({ comments })
    } catch (err) {
        next(err)
    }
}


exports.deleteComment = async (request, response, next) => {
    try {
        if(request.targetComment.author !== request.user.id){
            response.status(403).end()
        }
        await Comment.deleteOne ({id: request.params.id})
        response.status(204).end()

    } catch (err) {
        next(err)
    }
}


exports.favorite = async (request, response, next) => {
    try {
        const target = request.target
        target.addFavorite(request.user.id)
        response.status(200).end()
    } catch (err) {
        next(err)
    }
}


exports.unfavorite = async (request, response, next) => {
    try {
        const target = request.target
        target.removeFavorite(request.user.id)
        response.status(200).end()
    } catch (err) {
        next(err)
    }
}