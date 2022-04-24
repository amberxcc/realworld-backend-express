const developmentConfig = require('./config.development')
const productionConfig = require('./config.production')

const config = process.env.NODE_ENV === "production" ? productionConfig: developmentConfig

module.exports = config
