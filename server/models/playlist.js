const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    plays: {
        type: Number,
        default: 0,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    custom: {
        type: Boolean,
        default: false,
        required: true,
    },
    music: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true }
    ]
}) 

module.exports = mongoose.model('Playlist', playlistSchema)