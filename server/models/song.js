const mongoose = require('mongoose')
const User = require('../models/user')
const Playlist = require('../models/playlist')

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    plays: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    url: {
        type: String,
        required: true,
    },
    comments: [
        {
            text: { type: String, require: true},
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
        }
    ],
}) 

songSchema.post('findOneAndRemove', async document => {
    await User.updateMany(
        {},
        {
            $pull: {
                'music': { songId: document._id }
            }
        }
    )
    await Playlist.updateMany(
        {},
        { $pull: { music: document._id } }
    )
})

module.exports = mongoose.model('Song', songSchema)