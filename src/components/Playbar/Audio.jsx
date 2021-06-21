import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { setCurrentTime, setDuration, setVolume } from '../../redux/MusicPlayerReducer';
import Playbar from '../../components/Playbar/Playbar';

const Audio = ({state, setDuration, setCurrentTime, setVolume}) => {

    const audioRef = useRef()

    useEffect(() => {
		async function asyncFun()  {
			if (state.playing) {
				// await audioRef.current.load()
				await audioRef?.current?.play()
			}
			else 
				await audioRef?.current?.pause()
		}
		asyncFun()
	}, [state.playing, state.currentSongId])

	useEffect(() => {
		if (audioRef.current) audioRef.current.volume = state.volume
	}, [state.volume])

    return (
        <>
        {state.currentSong && <Playbar audioRef={audioRef} />}
        <audio
            loop
            ref={audioRef}
            src={
                state.currentSongId
                ? `http://localhost:3001/files/music/${state.currentSongId}.mp3`
                : ''
            }
            onLoadedMetadata={() => setDuration(audioRef.current.duration)}
            onTimeUpdate={e => setCurrentTime(e.target.currentTime)}
        />
        </>
    )
}


const mapStateToProps = state => ({
	state: state.player
})

const mapDispatchToProps = dispatch => ({
	setDuration: duration => dispatch(setDuration(duration)),
	setCurrentTime: time => dispatch(setCurrentTime(time)),
	setVolume: volume => dispatch(setVolume(volume)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Audio)
