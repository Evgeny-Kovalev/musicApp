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

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) return res.status(404).json({message: "Playlist is not found"})

    const song = await Song.findById(songId)
    if (!song) return res.status(404).json({message: "Song is not found"})
    
    playlist.music.push(song)
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