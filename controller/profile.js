const { User, Follow } = require('../model')

/*
 * 1. getProfile 也不需要身份验证
 * 
*/

exports.getProfile = async (request, response, next) => {
    try {
        let followed = request.followed.toJSON()

        // let relation = await Follow.findOne({follower: request.user._id, followed: followed._id})
        // if(relation) followed.following = true
        // else followed.following = false
        followed.following = false
        delete followed._id

        response.status(200).json({ profile: followed })
    } catch (err) {
        next(err)
    }
}

exports.follow = async (request, response, next) => {
    try {
        let follower = request.user._id
        let followed = request.follow._id
        let relation = await Follow.findOne({
            follower,
            followed
        })
        if (!relation) {
            const newFollow = new Follow({
                follower,
                followed
            })
            await newFollow.save()
        }
        let profile = request.follow
        profile = profile.toJSON()
        delete profile._id
        profile.follow = true
        response.status(200).json({ profile })
    } catch (err) {
        next(err)
    }
}

exports.unfollow = async (request, response, next) => {
    try {
        let follower = request.user._id
        let followed = request.unfollow._id
        let profile = request.unfollow
        profile = profile.toJSON()
        delete profile._id

        let relation = await Follow.findOne({
            follower,
            followed
        })
        if (relation) {
            await Follow.deleteOne({
                follower,
                followed
            })
            
        }
        profile.follow = false
        response.status(200).json({ profile })

    } catch (err) {
        next(err)
    }
}