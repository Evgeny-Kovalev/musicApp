const express = require('express')

const router = express.Router()

const usersController = require('../controllers/users')

// router.get("/", musicController.getUsers)
// router.get("/:userId", musicController.getUser)

router.get("/:userId/music", usersController.getUserMusic)
router.get("/:userId/music/liked", usersController.getUserLikedMusic)
router.put("/:userId/music/:songId", usersController.putAddUserMusic)
router.delete("/:userId/music/:songId", usersController.deleteUserMusic)

router.get("/:userId/playlists", usersController.getUserPlaylists)
router.post("/:userId/playlists", usersController.postCreateNewUserPlaylist)
router.put("/:userId/playlists/:playlistId", usersController.putAddUserPlaylist)
router.delete("/:userId/playlists/:playlistId", usersController.deleteUserPlaylist)

module.exports = router