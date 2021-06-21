const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')

const playlistsRoutes = require('./routes/playlists')
const musicRoutes = require('./routes/music')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')

const app = express()

app.use(express.json());

app.use(cors())
app.use('/files', express.static(path.join(__dirname, 'files')))

// app.use("/admin/playlists", playlistRoutes)
// app.use("/admin/music", musicRoutes)
app.use("/api/playlists", playlistsRoutes)
app.use("/api/music", musicRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)

app.use((req, res) => {
    res.status(404).send("Page not found")
})

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://test:2ZizB8Dhuk55VXG@cluster0.fmpzg.mongodb.net/musicApp?retryWrites=true&w=majority')
    .then(res => {
        console.log("Connected!")
        app.listen(3001)
    })
    .catch(err => console.log(err))
