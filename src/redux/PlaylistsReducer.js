const 
    FETCH_MY_PLAYLISTS_START = 'FETCH_MY_PLAYLISTS_START',
    FETCH_MY_PLAYLISTS_SUCCESS = 'FETCH_MY_PLAYLISTS_SUCCESS',
    FETCH_MY_PLAYLISTS_FAILED = 'FETCH_MY_PLAYLISTS_FAILED',

    FETCH_POPULAR_PLAYLISTS_START = 'FETCH_POPULAR_PLAYLISTS_START',
    FETCH_POPULAR_PLAYLISTS_SUCCESS = 'FETCH_POPULAR_PLAYLISTS_SUCCESS',
    FETCH_POPULAR_PLAYLISTS_FAILED = 'FETCH_POPULAR_PLAYLISTS_FAILED',

    DELETE_PLAYLIST_SUCCESS = 'DELETE_PLAYLIST_SUCCESS',
    ADD_PLAYLIST_SUCCESS = 'ADD_PLAYLIST_SUCCESS',

    ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST',
    REMOVE_SONG_FROM_PLAYLIST = 'REMOVE_SONG_FROM_PLAYLIST',
    
    SET_CURRENT_PLAYLIST = 'SET_CURRENT_PLAYLIST',
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
    popular: {
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

        case FETCH_POPULAR_PLAYLISTS_START:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    error: false,
                    loading: true,
                }
            }
        case FETCH_POPULAR_PLAYLISTS_SUCCESS:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    list: [...action.playlists],
                    error: false,
                    loading: false,
                }
            }
        case FETCH_POPULAR_PLAYLISTS_FAILED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    error: true,
                    loading: false,
                }
            }

        case ADD_SONG_TO_PLAYLIST:
            const myPlaylists = [...state.my.list]

            const currentPlaylist = myPlaylists.find(playlist => (playlist._id.toString() === action.playlistId.toString()))
            currentPlaylist.music = currentPlaylist.music ? [...currentPlaylist.music] : []
            
            if (!currentPlaylist.music.some(song => song._id.toString() === action.song._id.toString())) {
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
                    list: state.my.list.filter(song => song._id.toString() !== action.song._id.toString())
                },
                currentPlaylist: {
                    ...state.currentPlaylist,
                    music: state.currentPlaylist.music.filter(
                        song => song._id.toString() !== action.song._id.toString()
                        )
                }
            }
        }

        case SET_CURRENT_PLAYLIST:
            return {
                ...state,
                currentPlaylist: action.playlist
            }

        case DELETE_PLAYLIST_SUCCESS: 
            return {
                ...state,
                my: {
                    ...state.my,
                    list: state.my.list.filter(playlist => playlist && playlist._id.toString() !== action.playlist._id.toString())
                }
            }
        case ADD_PLAYLIST_SUCCESS: 
            const newList = state.my.list.filter(playlist => playlist && playlist._id.toString() !== action.playlist._id)
            newList.push(action.playlist)

            return {
                ...state,
                my: {
                    ...state.my,
                    list: newList
                }
            }
        default:
            return state
    }
}

export const createNewPlaylistSuccess = (playlist) => ({type: ADD_PLAYLIST_SUCCESS, playlist})

export const fetchMyPlaylistsStart = () => ({type: FETCH_MY_PLAYLISTS_START})
export const fetchMyPlaylistsSuccess = (playlists) => ({type: FETCH_MY_PLAYLISTS_SUCCESS, playlists})
export const fetchMyPlaylistsFailed = () => ({type: FETCH_MY_PLAYLISTS_FAILED})

export const fetchPopularPlaylistsStart = () => ({type: FETCH_POPULAR_PLAYLISTS_START})
export const fetchPopularPlaylistsSuccess = (playlists) => ({type: FETCH_POPULAR_PLAYLISTS_SUCCESS, playlists})
export const fetchPopularPlaylistsFailed = () => ({type: FETCH_POPULAR_PLAYLISTS_FAILED})

export const addSongToPlaylist = (playlistId, song) => ({ type: ADD_SONG_TO_PLAYLIST, playlistId, song })
export const removeSongFromPlaylist = (playlistId, song) => ({ type: REMOVE_SONG_FROM_PLAYLIST, playlistId, song })

export const setCurrentPlaylist = playlist => ({ type: SET_CURRENT_PLAYLIST, playlist })
export const setMyPlaylistMusic = (playlistId, music) => ({ type: SET_MY_PLAYLIST_MUSIC, playlistId, music })


export const initMyPlaylists = (userId) => async dispatch => {
    dispatch(fetchMyPlaylistsStart())
    try {
        const res = await fetch(`http://localhost:3001/api/users/${userId}/playlists`)
        const data = await res.json()
        if (res.status !== 200) throw new Error(data.message)
        dispatch(fetchMyPlaylistsSuccess(data))
    }
    catch(err) {
        console.error(err)
        dispatch(fetchMyPlaylistsFailed())
    }
}

export const initPopularPlaylists = () => async dispatch => {
    dispatch(fetchPopularPlaylistsStart())
    try {
        const res = await fetch(`http://localhost:3001/api/playlists`)
        const data = await res.json()
        if (res.status !== 200) throw new Error(data.message)
        dispatch(fetchPopularPlaylistsSuccess(data))
    }
    catch(err) {
        console.error(err)
        dispatch(fetchPopularPlaylistsFailed())
    }
}

export const initPlaylist = (playlistId) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:3001/api/playlists/${playlistId}`)
        const data = await res.json()
        if (res.status !== 200) throw new Error(data.message)
        dispatch(setCurrentPlaylist(data))
    }
    catch(err) {
        console.error(err);
    }
}

export const createNewMyPlaylistStart = (userId, playlist) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:3001/api/users/${userId}/playlists`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playlist),
        })
        const data = await res.json()
        if (res.status !== 200) throw new Error(data.message)
        dispatch(createNewPlaylistSuccess(data))
    }
    catch(err) {
        console.error(err);
    }
}

export const addSongToPlaylistStart = (playlistId, song) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:3001/api/playlists/${playlistId}/music/${song._id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await res.json()
        if (res.status !== 200) throw new Error(data.message)
        dispatch(addSongToPlaylist(playlistId, song))

    }
    catch(err) {
        console.error(err)
    }
}

export const removeSongFromPlaylistStart = (playlistId, song) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:3001/api/playlists/${playlistId}/music/${song._id}`, {
            method: "DELETE",
        })
        const data = await res.json()
        if (res.status !== 200) throw new Error(data.message)
        dispatch(removeSongFromPlaylist(playlistId, song))
    }
    catch(err) {
        console.error(err)
    }
}

export const deletePlaylistSuccess = (playlist) => ({ type: DELETE_PLAYLIST_SUCCESS, playlist })
export const removeFromMyPlaylists = (userId, playlist) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:3001/api/users/${userId}/playlists/${playlist._id}`, {
            method: "DELETE",
        })
        const data = res.json()
        if (res.status !== 200) throw new Error(data.message)
        dispatch(deletePlaylistSuccess(playlist))
    }
    catch(err) {
        console.error(err);
    }
}

export const addPlaylistSuccess = (playlist) => ({ type: ADD_PLAYLIST_SUCCESS, playlist })
export const addToMyPlaylists = (userId, playlist) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:3001/api/users/${userId}/playlists/${playlist._id}`, {
            method: "PUT",
        })
        const data = res.json()
        if (res.status !== 200) throw new Error(data.message)
        dispatch(addPlaylistSuccess(playlist))
    }
    catch(err) {
        console.error(err)
    }
}

export default PlaylistsReducer

