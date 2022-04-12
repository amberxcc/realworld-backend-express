const { User } = require('../model')
const { jwtSign } = require("../utils/util")

exports.login = async (request, response, next) => {
    try{
        const user = {
            username: request.user.username,
            email: request.user.username,
            bio: request.user.bio,
            image: request.user.image,
            token: jwtSign({id: request.user.id})
        }

        response.status(200).json({user})
    }catch(err){
        next(err)
    }
}

exports.registe = async (request, response, next) => {
    try{
        const newUser = new User(request.body.user)
        await newUser.save()

        const user = {
            username: newUser.username,
            email: newUser.email,
            token: jwtSign({id: newUser._id}),
            bio: null,
            image: null,
        }

        response.status(201).json({user})
    }catch(err){
        next(err)
    }
}

exports.getUser = async (request, response, next) => {
    try{
        const user = {
            username: request.user.username,
            email: request.user.username,
            bio: request.user.bio,
            image: request.user.image,
            token: jwtSign({id: request.user._id})
        }

        response.status(200).json({ user })
    }catch(err){
        next(err)
    }
}

exports.updateUser = async (request, response, next) => {
    try{
        for(let i in request.body.user){
            request.user[i] = request.body.user[i]
        }
        await request.user.save()
        
        const user = {
            username: request.user.username,
            email: request.user.username,
            bio: request.user.bio,
            image: request.user.image,
            token: jwtSign({id: request.user._id})
        }

        response.status(200).json({ user })
    }catch(err){
        next(err)
    }
}