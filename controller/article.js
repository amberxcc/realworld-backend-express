exports.getAll = async (request, response)=>{
    response.send(`GET => /api/articles`)
}

exports.getFeed = async (request, response)=>{
    response.send(`GET => /api/articles/feed`)
}

exports.getOne = async (request, response)=>{
    response.send(`GET => /api/articles/:slig`)
}

exports.creatOne = async (request, response)=>{
    response.send(`POST => /api/articles`)
}

exports.updateOne = async (request, response)=>{
    response.send(`PUT => /api/articles/:slug`)
}

exports.deleteOne = async (request, response)=>{
    response.send(`DELETE => /api/articles/:slug`)
}

exports.addComment = async (request, response)=>{
    response.send(`POST => /api/articles/:slug/comments`)
}

exports.getComments = async (request, response)=>{
    response.send(`GET => /api/articles/:slug/comments`)
}
exports.deleteComment = async (request, response)=>{
    response.send(`DELETE => /api/articles/:slug/comments/:id`)
}

exports.favorite = async (request, response)=>{
    response.send(`POST => /api/articles/:slug/favorite`)
}

exports.unfavorite = async (request, response)=>{
    response.send(`DELETE => /api/articles/:slug/favorite`)
}