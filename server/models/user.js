const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        default: 'https://via.placeholder.com/500/d1ecf1/000000'
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
    liked: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true } ],
    roles: [{type: String, ref: 'Role'}]
})

module.exports = mongoose.model('User', userSchema)
