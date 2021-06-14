let playlists = [
    {
        "id": 0,
        "title": "Coloring Book0",
        "img": "http://localhost:3001/files/img/poster-1.jpg",
        "plays": 100000,
        "likes": 50000,
        "music": [
            {
                "id":"0",
                "title":"song1",
                "img":"http://localhost:3001/files/img/poster-1.jpg",
                "artist":"artist-1",
                "plays":100000,
                "likes":50000
            },
            {
                "id":"1",
                "title":"song2",
                "img":"http://localhost:3001/files/img/poster-2.jpg",
                "artist":"artist-1",
                "plays":100000,
                "likes":50000
            },
            {
                "id":"2",
                "title":"song3",
                "img":"http://localhost:3001/files/img/poster-3.jpg",
                "artist":"artist-1",
                "plays":100000,
                "likes":50000
            }
        ]
    },
    {
        "id": 1,
        "title": "Coloring Book1",
        "img": "http://localhost:3001/files/img/poster-2.jpg",
        "plays": 22231,
        "likes": 50000,
        "music": [
            {
                "id":"0",
                "title":"song1",
                "img":"http://localhost:3001/files/img/poster-1.jpg",
                "artist":"artist-1",
                "plays":100000,
                "likes":50000
            },
            {
                "id":"1",
                "title":"song2",
                "img":"http://localhost:3001/files/img/poster-2.jpg",
                "artist":"artist-1",
                "plays":100000,
                "likes":50000
            },
        ]
    },
    {
        "id": 222,
        "title": "CUSTOM",
        "img": "https://via.placeholder.com/1000",
        "plays": 123123,
        "likes": 50000,
        "music": [
            {
                "id":"1",
                "title":"song1",
                "img":"http://localhost:3001/files/img/poster-1.jpg",
                "artist":"artist-1",
                "plays":100000,
                "likes":50000
            },
            {
                "id":"0",
                "title":"song2",
                "img":"http://localhost:3001/files/img/poster-2.jpg",
                "artist":"artist-1",
                "plays":100000,
                "likes":50000
            },
            {
                "id":"2",
                "title":"song3",
                "img":"http://localhost:3001/files/img/poster-3.jpg",
                "artist":"artist-1",
                "plays":100000,
                "likes":50000
            },
            {
                "id":"3",
                "title":"song4",
                "img":"http://localhost:3001/files/img/poster-4.png",
                "artist":"artist-1",
                "plays":100000,
                "likes":50000
            },
            {
                "id":"4",
                "title":"song5",
                "img":"http://localhost:3001/files/img/poster-5.jpg",
                "artist":"artist-1",
                "plays":100000,
                "likes":50000
            }
        ],
        custom: true,
    },
    {
        "id": 2,
        "title": "Coloring Book3",
        "img": "http://localhost:3001/files/img/poster-3.jpg",
        "plays": 22231,
        "likes": 50000,
        "music": [
            {
                "id":"1",
                "title":"song2",
                "img":"http://localhost:3001/files/img/poster-2.jpg",
                "artist":"artist-1",
                "plays":100000,
                "likes":50000
            },
        ]
    },
    {
        "id": 3,
        "title": "Coloring Book4",
        "img": "http://localhost:3001/files/img/poster-4.png",
        "plays": 22231,
        "likes": 50000,
        "music": [],
    },
    {
        "id": 4,
        "title": "Coloring Book5",
        "img": "http://localhost:3001/files/img/poster-5.jpg",
        "plays": 22231,
        "likes": 50000,
        "music": [],
    }
]

exports.getPlaylists = (req, res, next) => {
    res.status(200).json(playlists)
}

exports.getPlaylist = (req, res, next) => {
    const id = req.params.id
    const playlist = playlists.find(list => list.id.toString() === id.toString())
    if (playlist)
        res.status(200).json(playlist)
    else 
        res.status(404).json({message: "Playlists is not found"})
}

exports.postPlaylistMusic = (req, res, next) => {
    const id = req.params.id
    const song = req.body.song

    const playlist = playlists.find(list => list.id.toString() === id.toString())
    if (playlist){
        if (playlist.music && playlist.music.find(track => song.id.toString() === track.id.toString())) {
            return res.status(400).json({message: "Song has already been added to this playlist"}) 
        }
        playlist.music = [song, ...playlist.music || []]
        res.status(200).json(song)
    }
    else 
        res.status(404).json({message: "Playlists is not found"})
}

exports.deletePlaylistMusic = (req, res, next) => {
    const {id} = req.params
    const {song} = req.body

    const playlist = playlists.find(list => list.id.toString() === id.toString())
    if (playlist){
        if (playlist.music) {
            playlist.music = playlist.music.filter(track => track.id.toString() !== song.id.toString())
        }
        res.status(200).json(song)
    }
    else 
        res.status(404).json({message: "Playlists is not found"})
}

exports.postPlaylist = (req, res, next) => {
    const {title, imageUrl} = req.body

    const newPlaylist = {
        id: Date.now(),
        title,
        img: imageUrl,
        plays: 0,
        likes: 0,
        music: null,
        custom: true,
    }
    playlists.unshift(newPlaylist)
    res.status(200).json(newPlaylist)
}

exports.deletePlaylist = (req, res, next) => {
    const {id} = req.params
    playlists = playlists.filter(list => list.id.toString() !== id.toString())
    res.status(200).json(playlists)
}