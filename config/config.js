module.exports = {
    // api端口
    SERVER_PORT: 3001,

    // 数据库ip
    MONGODB_HOST: "47.96.9.220",

    // 数据库端口
    MONGODB_PORT: 27017,

    // 数据库连接超时时间
    dbTimeout: 5000,

    // 数据库集合
    COLLECTION: "realworld",

    // Hmac加密密钥
    SECRET_KEY: "secret",

    // jwt过期时间
    TOKEN_TIME: "7d"
}