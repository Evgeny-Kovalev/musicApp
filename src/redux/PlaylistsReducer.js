const 
    FETCH_MY_PLAYLISTS_START = 'FETCH_MY_PLAYLISTS_START',
    FETCH_MY_PLAYLISTS_SUCCESS = 'FETCH_MY_PLAYLISTS_SUCCESS',
    FETCH_MY_PLAYLISTS_FAILED = 'FETCH_MY_PLAYLISTS_FAILED',

    ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST',
    REMOVE_SONG_FROM_PLAYLIST = 'REMOVE_SONG_FROM_PLAYLIST',
    
    SET_CURRENT_PLAYLIST = 'SET_CURRENT_PLAYLIST',
    ADD_PLAYLIST = 'ADD_PLAYLIST',
    SET_MY_PLAYLIST_MUSIC = 'SET_MY_PLAYLIST_MUSIC'

const initialState = {
    all: {
        list: [],
        error: false,
        loading: false,
    },
    my: {
        list: null,
        error: false,
        loading: false,
    },
    currentPlaylist: null,
}

const PlaylistsReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_MY_PLAYLISTS_START:
            return {
                ...state,
                my: {
                    ...state.my,
                    error: false,
                    loading: true,
                }
            }
        case FETCH_MY_PLAYLISTS_SUCCESS:
            return {
                ...state,
                my: {
                    ...state.my,
                    list: [...action.playlists],
                    error: false,
                    loading: false,
                }
            }
        case FETCH_MY_PLAYLISTS_FAILED:
            return {
                ...state,
                my: {
                    ...state.my,
                    error: true,
                    loading: false,
                }
            }

        case ADD_PLAYLIST:
            return {
                ...state, 
                my: {
                    ...state.my,
                    list: [action.playlist, ...state.my.list]
                }
            }
        case ADD_SONG_TO_PLAYLIST:
                const myPlaylists = [...state.my.list]
    
                const currentPlaylist = myPlaylists.find(playlist => (playlist.id.toString() === action.playlistId.toString()))
                currentPlaylist.music = currentPlaylist.music ? [...currentPlaylist.music] : []
                
                if (!currentPlaylist.music.some(song => song.id.toString() === action.song.id.toString())) {
                    currentPlaylist.music = [action.song, ...currentPlaylist.music]
                }
    
                return {
                    ...state,
                    my: {
                        ...state.my,
                        list: myPlaylists
                    }
                }

        case REMOVE_SONG_FROM_PLAYLIST: {

            return {
                ...state,
                my: {
                    ...state.my,
                    list: state.my.list.filter(song => song.id.toString() !== action.song.id.toString())
                },
                currentPlaylist: {
                    ...state.currentPlaylist,
                    music: state.currentPlaylist.music.filter(
                        song => song.id.toString() !== action.song.id.toString()
                    )
                }
            }

        }

        case SET_CURRENT_PLAYLIST:
            return {
                ...state,
                currentPlaylist: action.playlist
            }
        // case SET_MY_PLAYLIST_MUSIC:
        //     const my = [...state.my.list]
        //     const currentPlaylist = my.find(playlist => playlist.id.toString() === action.playlistId.toString())
        //     currentPlaylist.music = [...]
            
        //     return { ...state, my }
        default:
            return state
    }
}

export const createNewPlaylist = (playlist) => ({type: ADD_PLAYLIST, playlist})

export const fetchMyPlaylistsStart = () => ({type: FETCH_MY_PLAYLISTS_START})
export const fetchMyPlaylistsSuccess = (playlists) => ({type: FETCH_MY_PLAYLISTS_SUCCESS, playlists})
export const fetchMyPlaylistsFailed = () => ({type: FETCH_MY_PLAYLISTS_FAILED})


export const addSongToPlaylist = (playlistId, song) => ({ type: ADD_SONG_TO_PLAYLIST, playlistId, song })
export const removeSongFromPlaylist = (playlistId, song) => ({ type: REMOVE_SONG_FROM_PLAYLIST, playlistId, song })

export const setCurrentPlaylist = playlist => ({ type: SET_CURRENT_PLAYLIST, playlist })
export const setMyPlaylistMusic = (playlistId, music) => ({ type: SET_MY_PLAYLIST_MUSIC, playlistId, music })




export const initMyPlaylists = () => dispatch => {
    dispatch(fetchMyPlaylistsStart())
    fetch('http://localhost:3001/api/playlists')
    .then(res => res.json())
    .then(playlists => {
        dispatch(fetchMyPlaylistsSuccess(playlists))
    })
    .catch(err => {
        console.log(err)
        dispatch(fetchMyPlaylistsFailed())
    })
}

export const initPlaylist = (playlistId) => dispatch => {
    fetch(`http://localhost:3001/api/playlists/${playlistId}`)
    .then(res => res.json())
    .then(playlist => {
        dispatch(setCurrentPlaylist(playlist))
    })
    .catch(err => {
        console.error(err);
    })
}

export const createNewPlaylistStart = (playlist) => dispatch => {
    fetch(`http://localhost:3001/api/playlists`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlist),
    })
    .then(res => res.json())
    .then(playlist => {
        dispatch(createNewPlaylist(playlist))
    })
    .catch(err => {
        console.error(err);
    })
}
export const deletePlaylist = (playlistId) => dispatch => {
    console.log("DEL", playlistId)
    fetch(`http://localhost:3001/api/playlists/${playlistId}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(playlists => {
        dispatch((fetchMyPlaylistsSuccess(playlists)))
    })
    .catch(err => {
        console.error(err);
    })
}
export const addSongToPlaylistStart = (playlistId, song) => dispatch => {
    fetch(`http://localhost:3001/api/playlists/${playlistId}/music`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({song: song}),
    })
    .then(res => {
        if (res.status !== 200) {
            throw new Error("err")
        }
        return res.json()
    })
    .then(song => {
        dispatch(addSongToPlaylist(playlistId, song))
    })
    .catch(err => {
        console.log(err)
    })
}
export const removeSongFromPlaylistStart = (playlistId, song) => dispatch => {
    console.log("START",playlistId, song)
    fetch(`http://localhost:3001/api/playlists/${playlistId}/music`, {
        method: "DELETE",
        body: JSON.stringify({song}),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => {
        if (res.status !== 200) {
            throw new Error("error")
        }
        return res.json()
    })
    .then(song => {
        console.log("OK")
        dispatch(removeSongFromPlaylist(playlistId, song))
    })
    .catch(err => {
        console.log(err)
    })
}


export default PlaylistsReducer

