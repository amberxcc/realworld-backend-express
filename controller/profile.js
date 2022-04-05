const { User } = require('../model')

exports.getProfile = async (request, response, next)=>{
    try{
        let username = request.params.username
        let user = await User.findOne({username})
        user = user.toJSON()
        user.following = false
        delete user._id
        response.status(201).json({profile: user})
    }catch(err){
        next(err)
    }
}

exports.follow = async (request, response, next)=>{
    response.send(`POST => /api/profiles/:username/follow`)
}

exports.unfollow = async (request, response, next)=>{
    response.send(`DELETE => /api/profiles/:username/follow`)
}