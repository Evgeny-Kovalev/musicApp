const mongoose = require('mongoose')
const User = require('../models/user')

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: 'https://via.placeholder.com/1000/' 
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

playlistSchema.post('findOneAndRemove', async document => {
    await User.updateMany(
        {},
        {
            $pull: {
                'playlists': { playlistId: document._id }
            }
        }
    )
})

module.exports = mongoose.model('Playlist', playlistSchema)