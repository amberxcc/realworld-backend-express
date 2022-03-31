const {jwtSign, jwtVerify} = require("../utils/util")
const {User} = require('../model')

module.exports = async (request, response, next) => {
    try{
        let token = request.headers.authorization || null
        console.log(token)
        token = token.substr(7)
        const result = jwtVerify(token)
        const user = await User.findOne({_id: result._id})
        request.user = user
        next()
    }catch(e){
        response.status(401).end()
    }
    
}
