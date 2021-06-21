const express = require('express')

const router = express.Router()

const musicController = require('../controllers/music')

router.get("/", musicController.getMusic)
router.post("/", musicController.postSong)
router.get("/:id", musicController.getSong)
router.get("/:id/comments", musicController.getSongComments)
router.post("/:id/comments", musicController.postSongComments)

router.post("/:songId/like", musicController.postAddSongLike)
router.delete("/:songId/like", musicController.deleteSongLike)

module.exports = router