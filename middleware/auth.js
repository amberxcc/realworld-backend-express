const {jwtSign, jwtVerify} = require("../utils/util")
const {User} = require('../model')

module.exports = async (request, response, next) => {
    try{
        let token = request.headers.authorization || null
        token = token.substr(6)
        const result = jwtVerify(token)
        console.log("==>auth",result)
        const user = await User.findOne({_id: result._id})
        request.user = user
        next()
    }catch(e){
        response.status(401).end()
    }
    
}
