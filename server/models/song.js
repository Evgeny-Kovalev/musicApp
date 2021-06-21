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
        required: true,
    },
    likes: {
        type: Number,
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