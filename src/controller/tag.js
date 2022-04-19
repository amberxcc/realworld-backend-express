const { Article } = require('../model')

exports.getTags = async (request, response, next) => {
  try {
    const tags = await Article.distinct('tagList')
    response.status(200).json({ tags })
  } catch (err) {
    next(err)
  }

}