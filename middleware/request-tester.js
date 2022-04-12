
module.exports = () => {
    return async (req, res, next) => {
        // console.log("===>req.headers:", req.headers)
        console.log("===>req.body:", req.body)
        console.log("===>req.params:", req.params)
        next()
    }
}