exports.login = async (request, response) => {
    response.send(`GET => /api/user/login`)
}

exports.registe = async (request, response) => {
    response.send(`POST => /api/users`)
    console.log(request.body)
}

exports.getUser = async (request, response) => {
    response.send(`GET => /api/user`)
}

exports.updateUser = async (request, response) => {
    response.send(`PUT => /api/user`)
}