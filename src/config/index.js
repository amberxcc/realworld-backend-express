const defaultConfig = require('./config.default')
const developmentConfig = require('./config.development')
const productionConfig = require('./config.production')

let config = defaultConfig
if(process.env.NODE_ENV === "development"){
    config = developmentConfig
}else if(process.env.NODE_ENV === "production"){
    config = productionConfig
}

module.exports = config
