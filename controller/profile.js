exports.getProfile = async (request, response, next)=>{
    response.send(`GET => /api/profiles/:username`)
}

exports.follow = async (request, response, next)=>{
    response.send(`POST => /api/profiles/:username/follow`)
}

exports.unfollow = async (request, response, next)=>{
    response.send(`DELETE => /api/profiles/:username/follow`)
}