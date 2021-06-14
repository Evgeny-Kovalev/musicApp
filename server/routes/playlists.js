const express = require('express')
const playlistController = require('../controllers/playlists')

const router = express.Router()

router.get("/", playlistController.getPlaylists)
router.post("/", playlistController.postPlaylist)

router.post("/:id/music", playlistController.postPlaylistMusic)
router.delete("/:id/music", playlistController.deletePlaylistMusic)

router.get("/:id", playlistController.getPlaylist)
router.delete("/:id", playlistController.deletePlaylist)

module.exports = router