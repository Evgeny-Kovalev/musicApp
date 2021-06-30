require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')

const playlistsRoutes = require('./routes/playlists')
const musicRoutes = require('./routes/music')
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const rolesRouter = require('./routes/roles')

const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

const app = express()

app.use(express.json());
app.use('/files', express.static(path.join(__dirname, 'files')))

app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destination = 'files/'
        if (file.fieldname === 'img') destination += 'img'
        if (file.fieldname === 'song') destination += 'music'
        cb(null, destination)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + file.originalname)
    }
})

const fileUploader = multer({storage})
app.use(fileUploader.fields([
    { name: 'img', maxCount: 1 },
    { name: 'song', maxCount: 1 }
]))
app.use("/api/playlists", playlistsRoutes)
app.use("/api/music", musicRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", authMiddleware, usersRoutes)
app.use("/api/roles", authMiddleware, roleMiddleware(["ADMIN"]), rolesRouter)

app.use((req, res) => {
    res.status(404).send("Page not found")
})

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DB_URL)
    .then(res => {
        console.log("Connected!")
        app.listen(process.env.PORT || 5000)
    })
    .catch(err => console.log(err))
