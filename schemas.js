const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        // username: { type: mongoose.Schema.Types.String },
        email: { type: mongoose.Schema.Types.String, unique: true, required: true },
        password: { type: mongoose.Schema.Types.String, required: true },
        fullName: { type: mongoose.Schema.Types.String, required: true },
        image: { type: mongoose.Schema.Types.String },
        likedVideos: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
        subscriptions: { type: mongoose.Schema.Types.String },

    },
    {
        collection: 'users',
        collation: {
            locale: 'en',
            strength: 2
        }
    })

const videoSchema = new mongoose.Schema(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        owner: { type: mongoose.Schema.Types.ObjectId,ref: "User"},
        title: { type: mongoose.Schema.Types.String, required: true },
        channelName: { type: mongoose.Schema.Types.String, required: true },
        views: { type: mongoose.Schema.Types.Number, default: 0 },
        publishDate: { type: mongoose.Schema.Types.Date, default: Date.now },
        channelImage: { type: mongoose.Schema.Types.String, default: '/assets/profileImage_default.jpg' },
        thumbnailImage: { type: mongoose.Schema.Types.String, default: '/assets/thumbnailImage_default.png' },
        youtubeUrl: { type: mongoose.Schema.Types.String, required: true },
        likes: { type: mongoose.Schema.Types.Number, default: 0 },
        subscribers: { type: mongoose.Schema.Types.Number, default: 0 },
        category: [{
            type: mongoose.Schema.Types.String, 
            default: "All",
            enum: [
                "All",
                "Mixes",
                "Music",
                "Gaming",
                "Live",
                "Cinematography",
                "Vlogs",
                "Cooking",
                "Sports",
                "News"
            ]
        }]
    },
    {
        collection: 'videos',
        collation: {
            locale: 'en',
            strength: 2
        }
    }
)


module.exports = {
    userSchema,
    videoSchema
}
