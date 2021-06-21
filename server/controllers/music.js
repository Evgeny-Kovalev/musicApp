const Song = require('../models/song')
const User = require('../models/user')


exports.getMusic = async (req, res, next) => {
    const {limit, orderBy, order, search} = req.query
    try {
        const music = await Song
            .find(search && { title: {$regex: '.*' + search + '.*'} })
            .sort({[orderBy]: +order})
            .limit(+limit)
        
        res.status(200).json(music.length ? music : null)
    }
    catch(err) {
        res.status(422).json({message: "Error"})
    }
}

exports.postSong = async (req, res, next) => {
    const { title, img, artist, plays, likes } = req.body
    const song = new Song({ title, img, artist, plays, likes, comments: [] })
    const newSong = await song.save()
    return res.status(200).json(newSong)
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
    const {userId, text} = req.body

    
    const song = await Song.findById(id)
    let newComment = { user: userId, text }
    song.comments.push(newComment)
    await song.save()   
    newComment.user = await User.findById(newComment.user)

    res.status(200).json(newComment)
}


exports.postAddSongLike = async (req, res, next) => {
    const {songId} = req.params
    const {userId} = req.body
    
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
    const {userId} = req.body

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