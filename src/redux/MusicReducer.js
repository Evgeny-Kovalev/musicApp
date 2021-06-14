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
    ADD_SONG_TO_MY_MUSIC = 'ADD_SONG_TO_MY_MUSIC',
    
    SET_CURRENT_SONG = 'SET_CURRENT_SONG',
    SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
    SEARCH_MUSIC = 'SEARCH_MUSIC'

const initialState = {
    search: {
        list: null,
        error: false,
        loading: false,
        value: null,
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
    global: [
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
            "artist":"artist-2",
            "plays":100000,
            "likes":52000
          },
    ]
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
            const music = {
                ...state,
                liked: {
                    ...state.liked,
                    list: {...state.liked.list}
                }
            }
            music.liked.list[action.song.id] = action.song
            
            return music
        }
        case UNLIKE_SONG: {
            const music = {
                ...state,
                liked: {
                    ...state.liked,
                    list: {...state.liked.list}
                }
            }
            delete music.liked.list[action.song.id]

            return music
        }
        case ADD_SONG_TO_MY_MUSIC:
            const newSong = {
                id: Date.now(),
                title: "song2",
                img: "/img/poster-2.jpg",
                artist: "artist-2",
                plays: 0,
                likes: 0
            }
            return {
                ...state,
                my: {
                    ...state.my,
                    list: [newSong, ...state.my.list]
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
        case SEARCH_MUSIC:
            // FIX
            return {
                ...state,
                search: {
                    ...state.search,
                    list: state.global.filter(song => song.title.includes(state.search.value))
                }
            }
        default:
            return state
    }
}

export const fetchMyMusicStart = () => ({type: FETCH_MY_MUSIC_START})
export const fetchMyMusicSuccess = (music) => ({type: FETCH_MY_MUSIC_SUCCESS, music})
export const fetchMyMusicFailed = () => ({type: FETCH_MY_MUSIC_FAILED})

export const initMyMusic = () => dispatch => {
    dispatch(fetchMyMusicStart())
    fetch('http://localhost:3001/api/music')
        .then(res => res.json())
        .then(music => {
            dispatch(fetchMyMusicSuccess(music))
        })
        .catch(err => {
            dispatch(fetchMyMusicFailed())
        })
}

export const initSong = (songId) => dispatch => {
    // dispatch(fetchMyPlaylistsStart())
    fetch(`http://localhost:3001/api/music/${songId}`)
        .then(res => res.json())
        .then(song => {
            console.log("INIT SONG",song)
            dispatch(setCurrentSong(song))
        })
        .catch(err => {
            console.error(err);
        })
}

export const fetchLikedMusicStart = () => ({type: FETCH_LIKED_MUSIC_START})
export const fetchLikedMusicSuccess = (music) => ({type: FETCH_LIKED_MUSIC_SUCCESS, music})
export const fetchLikedMusicFailed = () => ({type: FETCH_LIKED_MUSIC_FAILED})

export const initLikedMusic = () => dispatch => {
    dispatch(fetchLikedMusicStart())
    fetch('https://music-app-c7a13-default-rtdb.europe-west1.firebasedatabase.app/liked.json')
        .then(res => res.json())
        .then(likedMusic => {
            dispatch(fetchLikedMusicSuccess(likedMusic))
        })
        .catch(err => {
            dispatch(fetchLikedMusicFailed())
        })    
}

export const likeSong = (song) => dispatch => {
    console.log("LIKE")
    // const url = "https://music-app-c7a13-default-rtdb.europe-west1.firebasedatabase.app/liked.json"
    
    // try {
        // const response = await fetch(url, {
        //     method: 'POST',
        //     body: JSON.stringify(song),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // const json = await response.json()
        // console.log('Success:', JSON.stringify(json))
        dispatch({ type: LIKE_SONG, song })
    // }
    // catch (err) {
    //     console.error('Error:', err)
    // }

    // console.log(getState().music.liked)
}
export const unlikeSong = (song) => dispatch => {
    console.log("UNLIKE", song.id)

    // const url = `https://music-app-c7a13-default-rtdb.europe-west1.firebasedatabase.app/liked/${song.id.toString()}.json`
    
    // try {
    //     const response = await fetch(url, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     const json = await response.json()
    //     console.log('Success:', JSON.stringify(json))
        dispatch({ type: UNLIKE_SONG, song})
    // }
    // catch (err) {
    //     console.error('Error:', err)
    // }
    // console.log(getState().music.liked)
}

export const fetchPopularMusicStart = () => ({ type: FETCH_POPULAR_MUSIC_START })
export const fetchPopularMusicFail = () => ({ type: FETCH_POPULAR_MUSIC_FAILED })
export const fetchPopularMusicSuccess = (music) => ({ type: FETCH_POPULAR_MUSIC_SUCCESS, music })

export const initPopularMusic = () => dispatch => {
    dispatch(fetchPopularMusicStart())
    fetch("https://music-app-c7a13-default-rtdb.europe-west1.firebasedatabase.app/popular/music.json")
        .then(res => res.json())
        .then(popularMusic => {
            dispatch(fetchPopularMusicSuccess(popularMusic))
        })
        .catch(err => {
            dispatch(fetchPopularMusicFail())
        })
}
export const setCurrentSong = (song) => ({type: SET_CURRENT_SONG, song})
export const addSongToMyMusic = (song) => ({ type: ADD_SONG_TO_MY_MUSIC, song })

export const setSearchValue = (searchValue) => ({ type: SET_SEARCH_VALUE, searchValue })
export const searchMusic = (songName) => ({ type: SEARCH_MUSIC, songName})


export default MusicReducer

