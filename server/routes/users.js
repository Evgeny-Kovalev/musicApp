const express = require('express')

const router = express.Router()

const usersController = require('../controllers/users')
const roleMiddleware = require('../middleware/roleMiddleware')


router.get("/music", usersController.getUserMusic)
router.get("/music/liked", usersController.getUserLikedMusic)
router.put("/music/:songId", usersController.putAddUserMusic)
router.delete("/music/:songId", usersController.deleteUserMusic)

router.get("/playlists", usersController.getUserPlaylists)
router.post("/playlists", usersController.postCreateNewUserPlaylist)
router.put("/playlists/:playlistId", usersController.putAddUserPlaylist)
router.delete("/playlists/:playlistId", usersController.deleteUserPlaylist)

router.get("", roleMiddleware(["ADMIN"]), usersController.getUsers)
router.get("/:userId", usersController.getUser)
router.post("/", roleMiddleware(["ADMIN"]), usersController.postAddUser)
router.delete("/:userId", usersController.deleteUser)
router.put("/:userId", usersController.putEditUser)


module.exports = router