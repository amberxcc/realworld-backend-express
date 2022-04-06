const { Article } = require('../model')

exports.getTags = async (request, response, next) => {
  try {
    let tagList = await Article.distinct('tagList')
    response.status(200).json({ tagList })
  } catch (err) {
    next(err)
  }

}