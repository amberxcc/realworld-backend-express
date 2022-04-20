
const logger = require('../utils/logger')

module.exports = () => {
    return async (req, res, next) => {
        logger.debug("===>req.body:", req.body)
        logger.debug("===>req.params:", req.params)
        next()
    }
}