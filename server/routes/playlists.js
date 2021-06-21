const express = require('express')
const playlistController = require('../controllers/playlists')

const router = express.Router()

router.get("/", playlistController.getPlaylists)
router.post("/", playlistController.postCreatePlaylist)

router.post("/:playlistId/music/:songId", playlistController.postAddSongToPlaylist)
router.delete("/:playlistId/music/:songId", playlistController.deleteSongFromPlaylist)

router.get("/:id", playlistController.getPlaylist)
router.delete("/:id", playlistController.deletePlaylist)

module.exports = router