import { usersAPI, playlistAPI } from "../components/api/api"
import {addToastError, addToastSuccess} from "./ToastsReducer";

const 
    FETCH_MY_PLAYLISTS_START = 'FETCH_MY_PLAYLISTS_START',
    FETCH_MY_PLAYLISTS_SUCCESS = 'FETCH_MY_PLAYLISTS_SUCCESS',
    FETCH_MY_PLAYLISTS_FAILED = 'FETCH_MY_PLAYLISTS_FAILED',

    FETCH_POPULAR_PLAYLISTS_START = 'FETCH_POPULAR_PLAYLISTS_START',
    FETCH_POPULAR_PLAYLISTS_SUCCESS = 'FETCH_POPULAR_PLAYLISTS_SUCCESS',
    FETCH_POPULAR_PLAYLISTS_FAILED = 'FETCH_POPULAR_PLAYLISTS_FAILED',

    DELETE_PLAYLIST_SUCCESS = 'DELETE_PLAYLIST_SUCCESS',
    ADD_PLAYLIST_SUCCESS = 'ADD_PLAYLIST_SUCCESS',

    ADD_SONG_TO_PLAYLIST_SUCCESS = 'ADD_SONG_TO_PLAYLIST_SUCCESS',
    REMOVE_SONG_FROM_PLAYLIST_SUCCESS = 'REMOVE_SONG_FROM_PLAYLIST_SUCCESS',
    
    SET_CURRENT_PLAYLIST = 'SET_CURRENT_PLAYLIST',
    SET_MY_PLAYLIST_MUSIC = 'SET_MY_PLAYLIST_MUSIC',
    EDIT_PLAYLIST_SUCCESS = 'EDIT_PLAYLIST_SUCCESS'

const initialState = {
    all: {
        list: [],
        error: false,
        loading: false,
    },
    my: {
        list: [],
        error: false,
        loading: false,
    },
    popular: {
        list: [],
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

        case ADD_SONG_TO_PLAYLIST_SUCCESS:
            const myPlaylists = [...state.my.list]

            const currentPlaylist = myPlaylists.find(playlist => playlist._id.toString() === action.playlistId.toString())
            
            currentPlaylist.music = [
                action.song,
                ...currentPlaylist.music.filter(song => song._id.toString() !== action.song._id.toString())
            ]

            return {
                ...state,
                my: {
                    ...state.my,
                    list: myPlaylists
                }
            }

        case REMOVE_SONG_FROM_PLAYLIST_SUCCESS: {
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
        case EDIT_PLAYLIST_SUCCESS: 
            const playlistIndex = state.my.list.findIndex(playlist => playlist._id.toString() === action.playlist._id.toString())
            const playlists = [...state.my.list]
            playlists[playlistIndex] = {
                ...state.my.list[playlistIndex],
                ...action.newData
            }
            let current = {...state.currentPlaylist}
            if (state.currentPlaylist._id.toString() === action.playlist._id.toString()) {
                current = {
                    ...state.my.list[playlistIndex],
                    ...action.newData
                }
            }
            return {
                ...state,
                my: {
                    ...state.my,
                    list: playlists
                },
                currentPlaylist: current
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

export const addSongToPlaylistSuccess = (playlistId, song) => ({ type: ADD_SONG_TO_PLAYLIST_SUCCESS, playlistId, song })
export const removeSongFromPlaylistSuccess = (playlistId, song) => ({ type: REMOVE_SONG_FROM_PLAYLIST_SUCCESS, playlistId, song })

export const setCurrentPlaylist = playlist => ({ type: SET_CURRENT_PLAYLIST, playlist })
export const setMyPlaylistMusic = (playlistId, music) => ({ type: SET_MY_PLAYLIST_MUSIC, playlistId, music })


export const initMyPlaylists = (user) => async dispatch => {
    dispatch(fetchMyPlaylistsStart())
    try {
        const [res, data] = await usersAPI.getUserPlaylists(user)
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
        const [res, data] = await playlistAPI.getPopularPlaylists()
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
        const [res, data] = await playlistAPI.getPlaylistById(playlistId)
        if (res.status !== 200) throw new Error(data.message)
        dispatch(setCurrentPlaylist(data))
    }
    catch(err) {
        console.error(err);
    }
}

export const createNewMyPlaylistStart = (user, playlist) => async dispatch => {
    try {
        console.log(playlist)
        const [res, data] = await usersAPI.createNewUserPlaylist(user, playlist)
        if (res.status !== 200) throw new Error(data.message)
        dispatch(createNewPlaylistSuccess(data))
        dispatch(addToastSuccess({ text: `Playlist created successfully` }))
    }
    catch(err) {
        dispatch(addToastError({ text: 'Failed to create playlist' }))
        console.error(err);
    }
}

export const addSongToPlaylist = (user, playlistId, song) => async dispatch => {
    try {
        const [res, data] = await usersAPI.addSongToPlaylist(user, playlistId, song)
        if (res.status !== 200) throw new Error(data.message)
        dispatch(addSongToPlaylistSuccess(playlistId, song))
        dispatch(addToastSuccess({ text: 'Song added successfully' }))

    }
    catch(err) {
        dispatch(addToastError({ text: 'Failed to add song to playlist' }))
        console.error(err)
    }
}

export const removeSongFromPlaylist = (user, playlistId, song) => async dispatch => {
    try {
        const [res, data] = await usersAPI.removeSongFromPlaylist(user, playlistId, song)
        if (res.status !== 200) throw new Error(data.message)
        dispatch(removeSongFromPlaylistSuccess(playlistId, song))
        dispatch(addToastSuccess({ text: 'Song removed successfully' }))
    }
    catch(err) {
        dispatch(addToastError({ text: 'Failed to remove song from playlist' }))
        console.error(err)
    }
}

export const deletePlaylistSuccess = (playlist) => ({ type: DELETE_PLAYLIST_SUCCESS, playlist })
export const removeFromMyPlaylists = (user, playlist) => async dispatch => {
    try {
        const [res, data] = await usersAPI.removePlaylistFromMy(user, playlist)
        if (res.status !== 200) throw new Error(data.message)
        dispatch(deletePlaylistSuccess(playlist))
        dispatch(addToastSuccess({ text: 'Playlist removed successfully' }))
    }
    catch(err) {
        dispatch(addToastError({ text: 'Failed to remove playlist' }))
        console.error(err);
    }
}

export const addPlaylistSuccess = (playlist) => ({ type: ADD_PLAYLIST_SUCCESS, playlist })
export const addToMyPlaylists = (user, playlist) => async dispatch => {
    try {
        const [res, data] = await usersAPI.addPlaylistToMy(user, playlist)
        if (res.status !== 200) throw new Error(data.message)
        dispatch(addPlaylistSuccess(playlist))
        dispatch(addToastSuccess({ text: 'Playlist added successfully' }))
    }
    catch(err) {
        dispatch(addToastError({ text: 'Failed to add playlist' }))
        console.error(err)
    }
}

export const editMyPlaylist = (user, playlist, newData) => async dispatch => {
    try {
        const [res, data] = await playlistAPI.editMyPlaylist(user, playlist, newData)
        if (res.status !== 200) throw new Error(data.message)
        dispatch({ type: EDIT_PLAYLIST_SUCCESS, playlist, newData })
        dispatch(addToastSuccess({ text: 'Playlist edit successfully' }))
    }
    catch(err) {
        dispatch(addToastError({ text: 'Failed to edit playlist' }))
        console.error(err)
    }
}

export default PlaylistsReducer

