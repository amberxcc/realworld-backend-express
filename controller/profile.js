exports.getProfile = async (request, response)=>{
    response.send(`GET => /api/profiles/:username`)
}

exports.follow = async (request, response)=>{
    response.send(`POST => /api/profiles/:username/follow`)
}

exports.unfollow = async (request, response)=>{
    response.send(`DELETE => /api/profiles/:username/follow`)
}