const { jwtVerify } = require("../utils/util")
const { User } = require('../model')

module.exports = (option = {required: true}) => {
    return async (request, response, next) => {
        try {
            const token = request.headers.authorization?.substr(6)

            // 有token就验证
            if(token){
                const result = jwtVerify(token)
                const user = await User.findById(result.id)
                if(user) request.user = user
                else response.status(401).end()
            
            // 无token且需要验证，抛异常退出
            }else if(!token && option.required){
                response.status(401).end()
            }

            // 其他情况默认啥也不干,传递给下个中间件
            
            next()
        } catch (e) {
            response.status(401).end()
        }

    }
}
