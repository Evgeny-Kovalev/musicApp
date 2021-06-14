const express = require('express')

const router = express.Router()

const musicController = require('../controllers/music')

router.get("/", musicController.getMusic)
router.get("/:id", musicController.getSong)

module.exports = router