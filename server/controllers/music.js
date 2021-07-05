const Song = require('../models/song')
const User = require('../models/user')

exports.getMusic = async (req, res, next) => {
    const {limit, orderBy, order, search} = req.query
    try {
        const music = await Song
            .find(search && { title: {$regex: '.*' + search + '.*'} })
            .select('_id title artist img likes plays url')
            .sort({[orderBy]: +order})
            .limit(+limit)
        
        res.status(200).json(music.length ? music : null)
    }
    catch(err) {
        res.status(422).json({message: "Error"})
    }
}

exports.postAddSong = async (req, res, next) => {
    const baseUrl = process.env.BASE_URL
    const { title, artist } = req.body
    const songUrl = req.files.song[0].path
    const imgUrl = req.files.img[0].path
    if (!songUrl && !imgUrl) return res.status(400).json({message: 'Files not uploaded'})

    const song = new Song({ title, img: baseUrl + imgUrl, url: baseUrl + songUrl, artist, comments: [] })
    const newSong = await song.save()
    return res.status(200).json(newSong)
}

exports.putEditSong = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, artist } = req.body
        const baseUrl = process.env.BASE_URL

        const newSongData = { title, artist } 
        const imgUrl = req.files.img && req.files.img[0].path
        if (imgUrl) newSongData.img = baseUrl + imgUrl

        const song = await Song.findByIdAndUpdate(id, newSongData, { new: true })
        res.status(200).json({message: 'Song updated successfully', song})
    }
    catch(err) {
        res.status(400).json({message: "Error"})
    }
}

exports.deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params
        const music = await Song.findByIdAndRemove(id)
        res.status(200).json({message: 'Song deleted successfully'})
    }
    catch(err) {
        res.status(400).json({message: "Error"})
    }
}

exports.getSong = async (req, res, next) => {
    const {id} = req.params
    const song = await Song
        .findById(id)
        .select('-comments')
    res.status(200).json(song)
}

exports.getSongComments = async (req, res, next) => {
    const {id} = req.params
    const song = await Song
        .findById(id)
        .select('comments')
        .populate({
            path: 'comments.user', model: 'User', select: '-playlists -music'
        })
    res.status(200).json(song.comments)
}

exports.postSongComments = async (req, res, next) => {
    const {id} = req.params
    const {text} = req.body
    const {userId} = req.user
    
    const song = await Song.findById(id)
    let newComment = { text }
    newComment.user = await User.findById(userId)
    song.comments.push(newComment)
    await song.save()   
    res.status(200).json(song.comments[song.comments.length - 1])
}


exports.postAddSongLike = async (req, res, next) => {
    const {songId} = req.params
    const {userId} = req.user
    
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({message: "User not found"})

    const song = await Song.findById(songId)
    if (!song) return res.status(404).json({message: "Song not found"})

    const isLiked = user.liked.find(userLikedSong => userLikedSong._id.toString() === songId)
    if (isLiked) return res.status(422).json({message: "You have already liked this song"})
    
    user.liked.push(song)
    song.likes++
    
    await user.save()
    await song.save()
    
    return res.status(200).json({status: 200, message: "Like added"})
}

exports.deleteSongLike = async (req, res, next) => {
    const {songId} = req.params
    const {userId} = req.user

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({message: "User not found"})

    const song = await Song.findById(songId)
    if (!song) return res.status(404).json({message: "Song not found"})

    const isLiked = user.liked.find(userLikedSong => userLikedSong._id.toString() === songId)
    if (!isLiked) return res.status(422).json({message: "The song has no like"})

    user.liked = user.liked.filter(userLikedSong => userLikedSong._id.toString() !== song._id.toString())
    song.likes--
    
    await user.save()
    await song.save()
    
    return res.status(200).json({status: 200, message: "Like deleted"})
}

exports.postAddSongPlays = async (req, res, next) => {
    const {songId} = req.params
    
    const song = await Song.findById(songId)
    if (!song) return res.status(404).json({message: "Song not found"})

    song.plays++
    await song.save()
    return res.status(200).json({status: 200, message: "Play added"})
}