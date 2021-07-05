const User = require('../models/user')
const Song = require('../models/song')
const Role = require('../models/role')
const Playlist = require('../models/playlist')
const bcrypt = require('bcryptjs')

exports.deleteUser = async (req, res, next) => {
    const {userId} = req.params
    
    const user = await User.findByIdAndRemove(userId)
    if (!user) return res.status(404).json({message: "User not found"})

    return res.status(200).json({message: 'User deleted'})
}

exports.getUser = async (req, res, next) => {
    const {userId} = req.params
    
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({message: "User not found"})
    return res.status(200).json(user)
}

exports.putEditUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const { name, email } = req.body
        const baseUrl = process.env.BASE_URL

        const newUserData = { name, email } 
        const imgUrl = req.files.img && req.files.img[0].path
        if (imgUrl) newUserData.img = baseUrl + imgUrl

        const user = await User.findByIdAndUpdate(userId, newUserData, { new: true })
        res.status(200).json({message: 'User updated successfully', user})
    }
    catch(err) {
        res.status(400).json({message: "Error"})
    }
}

exports.postAddUser = async (req, res, next) => {
    const {name, email, password} = req.body  
    const img = req.files?.img && req.files?.img[0].path

    const baseUrl = process.env.BASE_URL

    const user = await User.findOne({email})
    if (user) return res.status(400).json({message: "User already exists"})
    
    const hashedPassword = await bcrypt.hash(password, 12)
    const userRole = await Role.findOne({value: "USER"})

    const newUser = new User({
        name,
        email,
        img: img && (baseUrl + img),
        password: hashedPassword,
        roles: [userRole.value]
    })
    await newUser.save()
    userRole.users.push(newUser)
    userRole.save()

    return res.status(200).json({
        message: "User created",
        user: {_id: newUser._id, name: newUser.name, email: newUser.email, roles: newUser.roles, img: newUser.img},
    })
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find().select('_id name email img roles')
    return res.status(200).json(users)
}

exports.getUserMusic = async (req, res, next) => {
    const {userId} = req.user
    const user = await User
        .findById(userId)
        .populate('music.songId', '-comments')
    
    if (!user) return res.status(404).json({message: "User not found"})
    const music = user.music.map(song => song.songId)
    return res.status(200).json(music)
}

exports.getUserLikedMusic = async (req, res, next) => {
    const {userId} = req.user
    const user = await User
        .findById(userId)
        .populate('liked', '-comments')
    
    if (!user) return res.status(404).json({message: "User not found"})
    return res.status(200).json(user.liked)
}

exports.putAddUserMusic = async (req, res, next) => {
    const {songId} = req.params
    const {userId} = req.user

    const song = await Song.findOne({_id: songId})
    if (!song) return res.status(404).json({message: "Song not found"})
    
    const user = await User
        .findById(userId)
        .populate('music.songId', '-comments')
    
    if (!user) return res.status(404).json({message: "User not found"})
    
    user.music.push({songId})
    await user.save()
    return res.status(200).json(song)
}

exports.deleteUserMusic = async (req, res, next) => {
    const {songId} = req.params
    const {userId} = req.user
    
    const user = await User.findById(userId).populate('songId')
    if (!user) return res.status(404).json({message: "User not found"})
    user.music = user.music.filter(song => song.songId.toString() !== songId.toString())
    await user.save()

    const music = user.music.map(song => song.songId)
    
    return res.status(200).json(music)
}



exports.getUserPlaylists = async (req, res, next) => {
    const {userId} = req.user

    const user = await User
        .findById(userId)
        .populate({
            path: 'playlists.playlistId', model: 'Playlist',
            populate: { path: 'music',model: 'Song', select: '-comments' }
        })
        
    if (!user) return res.status(404).json({message: "User not found"})

    const playlists = user.playlists.map(list => list.playlistId)
    return res.status(200).json(playlists)
}

exports.putAddUserPlaylist = async (req, res, next) => {
    const {playlistId} = req.params
    const {userId} = req.user

    const playlist = await Playlist.findOne({_id: playlistId})
    if (!playlist) return res.status(404).json({message: "Playlist not found"})

    const user = await User
        .findById(userId)
        .populate('playlists.playlistId')
    
    if (!user) return res.status(404).json({message: "User not found"})

    user.playlists.push({playlistId})
    await user.save()
    return res.status(200).json(playlist)
}

exports.deleteUserPlaylist = async (req, res, next) => {
    const {playlistId} = req.params
    const {userId} = req.user
    
    const user = await User.findById(userId).populate('songId')
    if (!user) return res.status(404).json({message: "User not found"})
    
    user.playlists = user.playlists.filter(list => list.playlistId.toString() !== playlistId.toString())
    await user.save()
    
    return res.status(200).json({message: "Playlist successfully deleted", status: 200})
}

exports.postCreateNewUserPlaylist = async (req, res, next) => {
    const {userId} = req.user
    const {title} = req.body  
    const img = req.files?.img && req.files.img[0].path
    const baseUrl = 'http://localhost:3001/'

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({message: "User not found"})
    
    const playlist = new Playlist({
        title: title,
        img: img && (baseUrl + img),
        custom: true
    })

    await playlist.save()
    user.playlists.push({playlistId: playlist._id})
    await user.save()
    
    return res.status(200).json(playlist)
}