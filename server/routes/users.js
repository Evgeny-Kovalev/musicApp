const express = require('express')

const router = express.Router()

const usersController = require('../controllers/users')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get("/", roleMiddleware(["ADMIN"]), usersController.getUsers)
// router.get("/:userId", usersController.getUser)

router.get("/music", usersController.getUserMusic)
router.get("/music/liked", usersController.getUserLikedMusic)
router.put("/music/:songId", usersController.putAddUserMusic)
router.delete("/music/:songId", usersController.deleteUserMusic)

router.get("/playlists", usersController.getUserPlaylists)
router.post("/playlists", usersController.postCreateNewUserPlaylist)
router.put("/playlists/:playlistId", usersController.putAddUserPlaylist)
router.delete("/playlists/:playlistId", usersController.deleteUserPlaylist)

module.exports = router