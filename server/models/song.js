const mongoose = require('mongoose')

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

module.exports = mongoose.model('Song', songSchema)