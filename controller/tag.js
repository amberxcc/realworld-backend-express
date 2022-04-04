exports.getTags = async (request, response, next)=>{
    response.status(200).json({
        "tags": [
          "reactjs",
          "angularjs"
        ]
      })
}