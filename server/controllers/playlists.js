const Playlist = require("../models/playlist")
const Song = require("../models/song")

exports.getPlaylists = async (req, res, next) => {
    const playlists = await Playlist.find({custom: false})
    return res.status(200).json(playlists)
}

exports.getPlaylist = async (req, res, next) => {
    const {id} = req.params
    const playlist = await Playlist.findById(id).populate('music')
    return res.status(200).json(playlist)
}

exports.postAddSongToPlaylist = async (req, res, next) => {
    const {playlistId, songId} = req.params
    const { id } = req.user

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) return res.status(404).json({message: "Playlist is not found"})

    const song = await Song.findById(songId)
    if (!song) return res.status(404).json({message: "Song is not found"})
    
    playlist.music = [ songId, ...playlist.music.filter(track => track.toString() !== songId.toString()) ]
    await playlist.save()   

    res.status(200).json(song)
}

exports.deleteSongFromPlaylist = async (req, res, next) => {
    const {playlistId, songId} = req.params

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) return res.status(404).json({message: "Playlist is not found"})

    playlist.music = playlist.music.filter(trackId => trackId.toString() !== songId.toString())
    await playlist.save()   

    res.status(200).json(playlist)
}

exports.postCreatePlaylist = async (req, res, next) => {
    const { title, img, plays, likes } = req.body

    const playlist = new Playlist({ title, img, plays, likes })

    const newPlaylist = await playlist.save()
    return res.status(200).json(newPlaylist)
}

exports.deletePlaylist = async (req, res, next) => {
    const {id} = req.params
    const playlist = await Playlist.findByIdAndRemove(id)
    res.status(200).json(playlist)
}

exports.putEditPlaylist = async (req, res, next) => {
    try {
        const {id} = req.params
        const {userId} = req.user
        const newData = req.body.playlist

        const playlist = await Playlist.findById(id)

        if (playlist.custom && playlist.creator?.toString() === userId.toString()) {
            await Playlist.updateOne({ _id: playlist._id }, newData )
        }
        else throw Error("This is not your playlist")
        res.status(200).json({message: 'Playlist updated successfully'})

    }
    catch(err) {
        console.log(err);
        res.status(400).json({message: "Error"})
    }
}