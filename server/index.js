const express = require('express')
const cors = require('cors')
const path = require('path')

const playlistRoutes = require('./routes/playlists')
const musicRoutes = require('./routes/music')

const app = express()

app.use(express.json());

app.use(cors())
app.use('/files', express.static(path.join(__dirname, 'files')))

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     next()
// })

app.use("/api/playlists", playlistRoutes)
app.use("/api/music", musicRoutes)

app.use((req, res) => {
    res.status(404).send("Page not found")
})

app.listen(3001)