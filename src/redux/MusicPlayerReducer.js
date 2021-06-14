const DEFAULT_VOLUME = 0.15

const PLAY = 'PLAY', PAUSE = 'PAUSE', SET_CURRENT_TIME = 'SET_CURRENT_TIME',
    SET_DURATION = 'SET_DURATION', SET_VOLUME= 'SET_VOLUME'

const initialState = {
    currentSongId: '',
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
                currentSongId: action.song?.id || state.currentSongId
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

export const play = (song) => {
    console.log('PLAY', song)
    return { type: PLAY, song}
}

export const pause = () => {
    console.log('pause')
    return { type: PAUSE}
}

export const setCurrentTime = time => ({ type: SET_CURRENT_TIME, time })
export const setDuration = duration => ({ type: SET_DURATION, duration })
export const setVolume = volume => ({ type: SET_VOLUME, volume })


export default MusicPlayerReducer

