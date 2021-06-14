const music = [
    {
        id: '0',
        title: "song1",
        img: "http://localhost:3001/files/img/poster-1.jpg",
        artist: "artist-1",
        plays: 100000,
        likes: 50000,
    },
    {
        id: '1',
        title: "song2",
        img: "http://localhost:3001/files/img/poster-2.jpg",
        artist: "artist-2",
        plays: 100000,
        likes: 52000,
    },
    {
        id: '2',
        title: "song3",
        img: "http://localhost:3001/files/img/poster-3.jpg",
        artist: "artist-3",
        plays: 110000,
        likes: 50000, 
    }
]

exports.getMusic = (req, res, next) => {
    res.status(200).json(music)
}

exports.getSong = (req, res, next) => {
    const {id} = req.params
    const song = music.find(track => track.id.toString() === id.toString())
    if (song) {
        return res.status(200).json(song)
    }
    else {
        return res.status(422).json({message: "Song not found"})
    }
}