const { User } = require('../model')

/*
 * 1. getProfile 也不需要身份验证
 * 
*/

exports.getProfile = async (request, response, next) => {
    try {
        let following = false
        if (request.user) {
            following = request.target.isFollower(request.user.id)
        }

        const profile = {
            username: request.target.username,
            bio: request.target.bio,
            image: request.target.image,
            following
        }

        response.status(200).json({ profile })
    } catch (err) {
        next(err)
    }
}

exports.follow = async (request, response, next) => {
    try {
        const target = request.wantToFollow
        target.addFollower(request.user.id)

        const profile = {
            username: target.username,
            bio: target.bio,
            image: target.image,
            following: target.isFollower(request.user.id)
        }

        response.status(200).json({ profile })
    } catch (err) {
        next(err)
    }
}

exports.unfollow = async (request, response, next) => {
    try {
        const target = request.wantToUnfollow
        target.removeFollower(request.user.id)

        const profile = {
            username: target.username,
            bio: target.bio,
            image: target.image,
            following: target.isFollower(request.user.id)
        }

        response.status(200).json({ profile })

    } catch (err) {
        next(err)
    }
}