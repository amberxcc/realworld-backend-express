const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    tagList: {
        type: [String],
        ref: 'Tag',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    slug: {
        type: String,
    },
    favoritedList: {
        type: [String],
        default: []
    },
}, { versionKey: false, timestamps: true, })


articleSchema.methods.getFavoriteCount = function () {
    return this.favoritedList.length
}


articleSchema.methods.isFavorite = function (userId) {
    return this.favoritedList.includes(userId)
}


articleSchema.methods.addFavorite = async function (userId) {
    if (!this.favoritedList.includes(userId)) {
        this.favoritedList.push(userId)
        await this.save()
    }

}


articleSchema.methods.removeFavorite = async function (userId) {
    for (let i = 0; i < this.favoritedList.length; i++) {
        if (this.favoritedList[i] === userId) {
            this.favoritedList.splice(userId, 1)
            await this.save()
        }
    }
}


module.exports = model('Article', articleSchema)