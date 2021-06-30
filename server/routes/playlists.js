const express = require('express')
const playlistController = require('../controllers/playlists')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const router = express.Router()

router.get("/", playlistController.getPlaylists)
router.post("/", roleMiddleware("ADMIN"), playlistController.postCreatePlaylist)

router.post("/:playlistId/music/:songId", authMiddleware, playlistController.postAddSongToPlaylist)
router.delete("/:playlistId/music/:songId", authMiddleware, playlistController.deleteSongFromPlaylist)

router.get("/:id", playlistController.getPlaylist)
router.put("/:id", authMiddleware, playlistController.putEditPlaylist)
router.delete("/:id", authMiddleware, playlistController.deletePlaylist)

module.exports = router