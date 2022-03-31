const {User} = require('../model')
const {myHash} = require("../utils/util")

exports.login = async (request, response) => {
    response.send(`GET => /api/user/login`)
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

exports.getUser = async (request, response) => {
    response.send(`GET => /api/user`)
}

exports.updateUser = async (request, response) => {
    response.send(`PUT => /api/user`)
}