import { useEffect, useState } from "react";

const usePlayer = ({music}) => {

    const initialState = {
        audio: new Audio(),
        songUrl: null,
        isPlaying: false,
        activeTrack: null,
        volume: 0.1,
    }

    const [state, setState] = useState(initialState)
    
    const [songTime, setSongTime] = useState(null)

    useEffect(() => {
        state.audio.addEventListener('timeupdate', () => setSongTime(state.audio.currentTime))
        return () => {
            state.audio.removeEventListener('timeupdate', () => setSongTime(state.audio.currentTime))
        }
    })

    const togglePlayPause =  async () => {
        try {
            state.isPlaying ? state.audio.pause() : await state.audio.play()
            setState(prevState => ({
                ...prevState,
                isPlaying: !prevState.isPlaying
            }))
        }
        catch(err) {
            console.error("Error", err)
        }
		
	}

    const playSong = async (id) => {
        const songUrl = `http://localhost:3000/music/${id}.mp3`;
		if (songUrl === state.songUrl) {
			togglePlayPause()
		} 
		else {
			try {
				state.audio.src = songUrl
				state.audio.volume = state.volume
				await state.audio.play()
                // console.log("123",state.audio.src)
				// let songIdx
				// const song = music.find((song, idx) => {
				// 	if (song.id === id) {
				// 		songIdx = idx
				// 		return true
				// 	}
				// 	return false
				// })
				// console.log("songIdx", songIdx)

				// console.log("audio", this.audio)
				setState(prevState => ({
                    ...prevState,
                    songUrl: songUrl,
                    activeTrack: id,
                    // activeTrackIndex: null,
                    isPlaying: true
				}))
			}
			catch(err) {
				console.error("Error", err)
			}
		}
	}

    const playNext = next => {
        // TODO
	}

    const setVolume = (value) => {
		state.audio.volume = value
		setState(prevState => ({
			...prevState,
            volume: value
		}))
	}
    
    const setCurrentTime = (val) => {
        state.audio.currentTime = val
    }

    const player = {
        audio: state.audio,
        duration: state.audio.duration,
        currentTime: songTime,
        isPlaying: state.isPlaying,
        activeTrack: state.activeTrack,
        volume: state.audio.volume,
        playSong,
        togglePlayPause,
        setVolume,
        setCurrentTime,
        playNext,
    }

    return player
}

export default usePlayer