const { User } = require('../model')
const { jwtSign } = require("../utils/util")

exports.login = async (request, response, next) => {
    try{
        let user = request.user.toJSON() 
        user.token = jwtSign({_id: user._id})
        delete user.password
        delete user._id
        response.status(200).json({user})
    }catch(err){
        next(err)
    }
}

exports.registe = async (request, response, next) => {
    try{
        let user = new User(request.body.user)
        await user.save()
        user = user.toJSON() 
        user.token = jwtSign({_id: user._id})
        delete user.password
        delete user.createdAt
        delete user.updateAt
        delete user._id
        response.status(201).json({user})
    }catch(err){
        next(err)
    }
}

exports.getUser = async (request, response, next) => {
    try{
        let user = request.user.toJSON()
        delete user._id
        response.status(200).json({ user })
    }catch(err){
        next(err)
    }
}

exports.updateUser = async (request, response, next) => {
    try{
        let user = request.user
        await user.save()
        user = user.toJSON()
        delete user._id
        delete user.password // 虽然查不出来，但可能更新了，再删下
        response.status(200).json({ user })
    }catch(err){
        next(err)
    }
}