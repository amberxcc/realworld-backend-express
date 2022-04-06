const {jwtSign, jwtVerify} = require("../utils/util")
const {User} = require('../model')

module.exports = async (request, response, next) => {
    try{
        let token = request.headers.authorization || null
        token = token.substr(6)
        const result = jwtVerify(token)
        const user = await User.findById(result._id)
        // console.log("auth result==>", user, result, token)
        request.user = user
        next()
    }catch(e){
        response.status(401).end()
    }
    
}
