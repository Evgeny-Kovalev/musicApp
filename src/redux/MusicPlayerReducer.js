import { addPlayToSong } from "./MusicReducer"

const DEFAULT_VOLUME = 0.15

const PLAY = 'PLAY', PAUSE = 'PAUSE', SET_CURRENT_TIME = 'SET_CURRENT_TIME',
    SET_DURATION = 'SET_DURATION', SET_VOLUME= 'SET_VOLUME'

const initialState = {
    // currentSongId: '',
    currentSong: null,
    currentTime: 0,
    duration: 0,
    playing: false,

    volumePrev: DEFAULT_VOLUME,
    volume: DEFAULT_VOLUME
}

const MusicPlayerReducer = (state = initialState, action) => {
    switch (action.type) {

        case PLAY:
            return {
                ...state,
                playing: true,
                currentSong: action.song || state.currentSong,
                // currentSongId: action.song?._id || state.currentSongId
            }
        case PAUSE:
            return { ...state, playing: false }

        case SET_CURRENT_TIME:
            return { ...state, currentTime: action.time }
        
        case SET_DURATION:
            return { ...state, duration: action.duration }

        case SET_VOLUME:
            return {
                ...state,
                volumePrev: parseFloat(action.volume) || state.volumePrev,
                volume: parseFloat(action.volume),
            }

        default:
            return state
    }
}

let timeout = null

export const play = (song) => dispatch => {
    console.log('PLAY', song)
    let playsCount = localStorage.getItem('playsCount')
    
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
        playsCount = playsCount ? ++playsCount : 1
        localStorage.setItem('playsCount', playsCount)
        dispatch(addPlayToSong(song))
    }, 3_000);

    dispatch({ type: PLAY, song })
}

export const pause = () => {
    console.log('pause')
    clearTimeout(timeout)
    timeout = null
    return { type: PAUSE}
}

export const setCurrentTime = time => ({ type: SET_CURRENT_TIME, time })
export const setDuration = duration => ({ type: SET_DURATION, duration })
export const setVolume = volume => ({ type: SET_VOLUME, volume })


export default MusicPlayerReducer

