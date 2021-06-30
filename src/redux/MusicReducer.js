import { musicAPI, usersAPI } from "../components/api/api"

const 
    FETCH_MY_MUSIC_START = 'FETCH_MY_MUSIC_START',
    FETCH_MY_MUSIC_SUCCESS = 'FETCH_MY_MUSIC_SUCCESS',
    FETCH_MY_MUSIC_FAILED = 'FETCH_MY_MUSIC_FAILED',

    FETCH_LIKED_MUSIC_START = 'FETCH_LIKED_MUSIC_START',
    FETCH_LIKED_MUSIC_SUCCESS = 'FETCH_LIKED_MUSIC_SUCCESS',
    FETCH_LIKED_MUSIC_FAILED = 'FETCH_LIKED_MUSIC_FAILED',

    FETCH_POPULAR_MUSIC_START = 'FETCH_LIKED_MUSIC_START',
    FETCH_POPULAR_MUSIC_SUCCESS = 'FETCH_POPULAR_MUSIC_SUCCESS',
    FETCH_POPULAR_MUSIC_FAILED = 'FETCH_POPULAR_MUSIC_FAILED',
    
    UNLIKE_SONG = 'UNLIKE_SONGS',
    LIKE_SONG = 'LIKE_SONG',
    ADD_SONG_TO_MY_MUSIC_SUCCESS = 'ADD_SONG_TO_MY_MUSIC_SUCCESS',
    
    SET_CURRENT_SONG = 'SET_CURRENT_SONG',
    SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
    SET_SEARCH_MUSIC = 'SET_SEARCH_MUSIC',
    REMOVE_FROM_MY_MUSIC_SUCCESS ='REMOVE_FROM_MY_MUSIC_SUCCESS',
    ADD_PLAY_TO_MUSIC_SUCCESS ='ADD_PLAY_TO_MUSIC_SUCCESS'   
const initialState = {
    search: {
        list: null,
        error: false,
        loading: false,
    },
    my: {
        list: null,
        error: false,
        loading: false,
    },
    liked: {
        list: null,
        error: false,
        loading: false,
    },
    popular: {
        list: null,
        error: false,
        loading: false,
    },
    currentSong: null,
}

const MusicReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_MY_MUSIC_START:
            return {
                ...state,
                my: {
                    ...state.my,
                    error: false,
                    loading: true,
                }
            }
        case FETCH_MY_MUSIC_SUCCESS:
            return {
                ...state,
                my: {
                    ...state.my,
                    list: [...action.music],
                    error: false,
                    loading: false,
                }
            }
        case FETCH_MY_MUSIC_FAILED:
            return {
                ...state,
                my: {
                    ...state.my,
                    error: true,
                    loading: false,
                }
            }
        case FETCH_LIKED_MUSIC_START:
            return {
                ...state,
                liked: {
                    ...state.liked,
                    error: false,
                    loading: true,
                }
            }
        case FETCH_LIKED_MUSIC_SUCCESS:
            return {
                ...state,
                liked: {
                    ...state.liked,
                    list: [...action.music],
                    error: false,
                    loading: false,
                }
            }
        case FETCH_LIKED_MUSIC_FAILED:
            return {
                ...state,
                liked: {
                    ...state.liked,
                    error: true,
                    loading: false,
                }
            }
        case FETCH_POPULAR_MUSIC_START:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    error: false,
                    loading: true,
                }
            }
        case FETCH_POPULAR_MUSIC_SUCCESS:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    list: [...action.music],
                    error: false,
                    loading: false,
                }
            }
        case FETCH_POPULAR_MUSIC_FAILED:
            return {
                ...state,
                popular: {
                    ...state.popular,
                    error: true,
                    loading: false,
                }
            }
        case SET_CURRENT_SONG:
            return { ...state, currentSong: action.song }

        case LIKE_SONG: {
            return {
                ...state,
                liked: {
                    ...state.liked,
                    list: [action.song, ...state.liked.list]
                }
            }
        }
        case UNLIKE_SONG: {
            return {
                ...state,
                liked: {
                    ...state.liked,
                    list: state.liked.list.filter(likedSong => likedSong._id !== action.song._id)
                }
            }
        }

        case SET_SEARCH_VALUE:
            return {
                ...state,
                search: {
                    ...state.search,
                    value: action.searchValue
                }
            }
        case SET_SEARCH_MUSIC:
            return {
                ...state,
                search: {
                    ...state.search,
                    list: action.music
                }
            }
        case ADD_SONG_TO_MY_MUSIC_SUCCESS:
            const newList = state.my.list.filter(song => song._id.toString() !== action.song._id)
            newList.push(action.song)

            return {
                ...state,
                my: {
                    ...state.my,
                    list: newList
                }
            }
        case REMOVE_FROM_MY_MUSIC_SUCCESS:
            return {
                ...state,
                my: {
                    ...state.my,
                    list: state.my.list.filter(song => song._id.toString() !== action.song._id)
                }
            }
        default:
            return state
    }
}

export const fetchMyMusicStart = () => ({type: FETCH_MY_MUSIC_START})
export const fetchMyMusicSuccess = (music) => ({type: FETCH_MY_MUSIC_SUCCESS, music})
export const fetchMyMusicFailed = () => ({type: FETCH_MY_MUSIC_FAILED})

export const initMyMusic = (user) => async dispatch => {
    dispatch(fetchMyMusicStart())
    try {
        const [res, data] = await usersAPI.getUserMusic(user)
        if (res.status !== 200) throw Error(data.message)
        dispatch(fetchMyMusicSuccess(data))
    }
    catch(err) {
        dispatch(fetchMyMusicFailed())
        console.log(err)
    }
}

export const initSong = (songId) => async dispatch => {
    try {
        const [res, data] = await musicAPI.getSongById(songId)
        if (res.status !== 200) throw Error(data.message)
        dispatch(setCurrentSong(data))
    }
    catch(err) {
        console.log(err)
    }
}

export const fetchLikedMusicStart = () => ({type: FETCH_LIKED_MUSIC_START})
export const fetchLikedMusicSuccess = (music) => ({type: FETCH_LIKED_MUSIC_SUCCESS, music})
export const fetchLikedMusicFailed = () => ({type: FETCH_LIKED_MUSIC_FAILED})

export const initLikedMusic = (user) => async dispatch => {
    dispatch(fetchLikedMusicStart())
    try {
        const [res, data] = await usersAPI.getUserLikedMusic(user)
        if (res.status !== 200) throw Error(data.message)
        dispatch(fetchLikedMusicSuccess(data))
    }
    catch(err) {
        fetchLikedMusicFailed()
        console.log(err)
    }
}

export const likeSong = (user, song) => async dispatch => {
    try {
        const [res, data] = await musicAPI.likeSong(user, song)
        if (res.status !== 200) throw Error(data.message)
        dispatch({ type: LIKE_SONG, song })
    }
    catch (err) {
        console.error('Error:', err)
    }
}

export const unlikeSong = (user, song) => async dispatch => {
    try {
        const [res, data] = await musicAPI.unlikeSong(user, song)
        if (res.status !== 200) throw Error(data.message)
        dispatch({ type: UNLIKE_SONG, song })
    }
    catch (err) {
        console.error('Error:', err)
    }
}

export const fetchPopularMusicStart = () => ({ type: FETCH_POPULAR_MUSIC_START })
export const fetchPopularMusicFail = () => ({ type: FETCH_POPULAR_MUSIC_FAILED })
export const fetchPopularMusicSuccess = (music) => ({ type: FETCH_POPULAR_MUSIC_SUCCESS, music })

export const initPopularMusic = (user) => async dispatch => {
    dispatch(fetchPopularMusicStart())
    try {
        const [res, data] = await musicAPI.getMusic(user, {
            orderBy: 'likes',
            order: -1,
        })
        if (res.status !== 200) throw Error(data.message)
        dispatch(fetchPopularMusicSuccess(data))
    }
    catch(err) {
        dispatch(fetchPopularMusicFail())
    }
}
export const setCurrentSong = (song) => ({type: SET_CURRENT_SONG, song})

export const setSearchMusic = (music) => ({ type: SET_SEARCH_MUSIC, music})
export const searchMusic = (user, songName) => async dispatch => {
    try {
        const [res, data] = await musicAPI.getMusic(user, { songName })
        if (res.status !== 200) throw Error(data.message)
        dispatch(setSearchMusic(data))
    }
    catch(err) {
        console.log(err)
    }
}

export const addSongToMyMusicSuccess = (song) => ({ type: ADD_SONG_TO_MY_MUSIC_SUCCESS, song })
export const addSongToMyMusic = (user, song) => async dispatch => {
    try {
        const [res, data] = await usersAPI.addSongToUserMusic(user, song)
        if (res.status !== 200) throw Error(data.message)
        dispatch(addSongToMyMusicSuccess(song))
    }
    catch(err) {
        console.log(err)
    }
}

export const removeFromMyMusicSuccess = (song) => ({ type: REMOVE_FROM_MY_MUSIC_SUCCESS, song })
export const removeSongFromMyMusic = (user, song) => async dispatch => {
    try {
        const [res, data] = await usersAPI.removeSongFromUserMusic(user, song)
        if (res.status !== 200) throw Error(data.message)
        dispatch(removeFromMyMusicSuccess(song))
    }
    catch(err) {
        console.log(err)
    }
}

export const addPlayToSong = (song) => async dispatch => {
    try {
        const [res, data] = await musicAPI.addPlayToSong(song)

        if (res.status !== 200) throw Error(data.message)
    }
    catch(err) {
        console.log(err)
    }
}



export default MusicReducer

