const {User} = require('../model')
const {myHash, jwtSign, jwtVerify} = require("../utils/util")

exports.login = async (request, response, next) => {
    try{
        let user = request.user.toJSON()
        user.jwt = jwtSign({_id: user._id})
        delete user.password
        response.status(201).json({user})
    }catch(err){
        next(err)
    }
}

exports.registe = async (request, response, next) => {
    try{
        let user = new User(request.body.user)
        await user.save()
        user = user.toJSON()
        delete user.password
        response.status(201).json({user})
    }catch(err){
        next(err)
    }
}

exports.getUser = async (request, response, next) => {
    try{
        let user = request.user.toJSON()
        delete user.password
        response.status(200).json({ user })
    }catch(err){
        next(err)
    }
}

exports.updateUser = async (request, response, next) => {
    response.send(`PUT => /api/user`)
}