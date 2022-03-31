const {User} = require('../model')

exports.login = async (request, response) => {
    response.send(`GET => /api/user/login`)
}

exports.registe = async (request, response, next) => {
    try{
        console.log("=> request.body.user:",request.body.user)
        const user = new User(request.body.user)
        await user.save()
        console.log("=> user:", JSON.stringify(user))
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