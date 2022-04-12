const { Schema, model } = require('mongoose')
const { myHash } = require('../utils/util')

const userSchema = new Schema({
    username: {
        type: String,
        required: true, // 必填项
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        set: str => myHash(str), // 存入数据时，先哈希处理
    },
    bio: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    followers: { //追随者、关注自己的人
        type: [String],
        default: [],
    },
}, { versionKey: false, timestamps: true })


userSchema.methods.isFollower = function (userId) {
    return this.followers.includes(userId)
}


userSchema.methods.addFollower = async function (followerId) {
    if (!this.followers.includes(followerId)) {
        this.followers.push(followerId)
        await this.save()
    }

}


userSchema.methods.removeFollower = async function (followerId) {
    for (let i = 0; i < this.followers.length; i++) {
        if (this.followers[i] === followerId) {
            this.followers.splice(followerId, 1)
            await this.save()
        }
    }
}


module.exports = model('User', userSchema)