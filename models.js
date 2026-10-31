const mongoose = require('mongoose')
const { userSchema, videoSchema } = require("./schemas") 

const User = mongoose.model('User' , userSchema)
const Video = mongoose.model('Video' , videoSchema)

module.exports = {
    User,
    Video
}