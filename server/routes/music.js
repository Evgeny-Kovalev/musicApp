const express = require('express')

const router = express.Router()

const musicController = require('../controllers/music')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.get("/", musicController.getMusic)
router.post("/", roleMiddleware(["ADMIN"]), musicController.postAddSong)
router.get("/:id", musicController.getSong)
router.put("/:id", authMiddleware, roleMiddleware(["ADMIN"]), musicController.putEditSong)
router.delete("/:id", roleMiddleware(["ADMIN"]), musicController.deleteSong)
router.get("/:id/comments", musicController.getSongComments)
router.post("/:id/comments", authMiddleware, musicController.postSongComments)

router.post("/:songId/like", authMiddleware, musicController.postAddSongLike)
router.delete("/:songId/like", authMiddleware, musicController.deleteSongLike)

router.post("/:songId/plays", musicController.postAddSongPlays)

module.exports = router