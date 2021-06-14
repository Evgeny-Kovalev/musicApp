import React from 'react'
import { connect } from 'react-redux'
import { formatSecondsAsTime } from '../../helpers'
import { pause, play, setCurrentTime, setVolume } from '../../redux/MusicPlayerReducer'
import './Playbar.scss';

const Playbar = ({playerState, play, pause, setCurrentTime, setVolume, audioRef}) => {

    const rewindSongHandle = e => {
        setCurrentTime(e.target.value)
        audioRef.current.currentTime = e.target.value
    }

    if (!playerState.currentSong) return null 
    
    let volumeIcon = <i className="fa fa-volume-down"></i>;
    
    if (playerState.volume === 0)
        volumeIcon = <i className="fas fa-volume-mute"></i>
    if (playerState.volume > 0.7)
        volumeIcon = <i className="fas fa-volume-up"></i>

    return (
        <div className="main_player">
            <div className="main_player__inner">
                <div className="main_player__item main_player__music_info">
                    <img 
                        className="song_img main_player__song_img"
                        src={playerState.currentSong.img}
                        alt="Song"
                    />
                    <div className="main_player__song_name">{playerState.currentSong.title}</div>
                </div>
                <div className="main_player__music_slider main_player__item">
                    <div className="main_player__current_time">
                        {playerState.currentTime ? formatSecondsAsTime(playerState.currentTime) : "00:00"}
                    </div>
                    <input
                        type="range" 
                        className="main_player__range player_range" 
                        onChange={rewindSongHandle}
                        value={playerState.currentTime || 0}
                        max={+playerState.duration || 100}
                    />
                    <div className="main_player__total_duration">
                        {playerState.duration ? formatSecondsAsTime(playerState.duration) : "00:00"}
                    </div>
                </div>
                <div className="main_player__buttons main_player__item">
                    {/* <div className="main_player__btn player_btn player_btn--prev">
                        <i className="fa fa-step-backward"></i>
                    </div> */}
                    <div className="main_player__btn player_btn player_btn--pause" onClick={playerState.playing ? pause : play} >
                    {
                        playerState.playing 
                        ? <i className="fa fa-pause-circle fa-2x"></i>
                        : <i className="fa fa-play-circle fa-2x"></i>
                    }
                    </div>
                    {/* <div className="main_player__btn player_btn player_btn--next">
                        <i className="fa fa-step-forward"></i>
                    </div> */}
                </div>
                <div className="main_player__volume main_player__item">
                    <div 
                        className={`main_player__volume_down ${playerState.volume === 0 ? "main_player__volume_down--off" : ""}`}
                        onClick={
                            () => playerState.volume === 0
                                ? setVolume(playerState.volumePrev)
                                : setVolume(0)
                        }
                    >
                        {
                            volumeIcon
                            // playerState.volume === 0
                            // ? <i className="fas fa-volume-mute"></i>
                            // : <i className="fa fa-volume-down"></i>
                        }
                    </div>
                    <input 
                        type="range" 
                        className="player_range main_player__volume_range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        onChange={(e) => setVolume(e.target.value)}
                        value={playerState.volume}
                    />
                    {/* <div className="main_player__volume_up"><i className="fa fa-volume-up"></i></div> */}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    playerState: state.player
})

const mapDispatchToProps = dispatch => ({
    setVolume: volume => dispatch(setVolume(volume)),
    setCurrentTime: time => dispatch(setCurrentTime(time)),
    play: () => dispatch(play()),
    pause: () => dispatch(pause()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Playbar)
