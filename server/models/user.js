const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    playlists: [
        {
            playlistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist', required: true }
        }
    ],
    music: [
        {
            songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true }
        }
    ],
    liked: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true } ]
})

module.exports = mongoose.model('User', userSchema)
