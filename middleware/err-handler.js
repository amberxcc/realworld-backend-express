const util = require('util')


module.exports = () => {
    return (error, request, response, next) => {
        response.status(500).json({ 
            err: util.format(error) // err对象无法被json序列化，其属性都在原型对象上，需要处理下（仅针对开发时这样返回错误信息）
        })
    }
}