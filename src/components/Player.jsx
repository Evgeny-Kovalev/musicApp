import React from 'react'
import { formatSecondsAsTime } from './../helpers';

const Player = ({player}) => {

    const {audio, setVolume, volume, isPlaying, togglePlayPause, playNext, currentTime, setCurrentTime, duration} = player

    const timeChangeInputHandle = (e) => {
        setCurrentTime(e.target.value)
    }

    return (
        <div className="main_player">
            <div className="main_player__inner">
                <div className="main_player__item main_player__music_info">
                    <img src="/img/poster-1.jpg" alt="" className="song_img main_player__song_img"/>
                    <div className="main_player__song_name">Pop Smoke</div>
                </div>
                <div className="main_player__music_slider main_player__item">
                    <div className="main_player__current_time">{currentTime ? formatSecondsAsTime(currentTime) : "00:00"}</div>
                    <input 
                        type="range" 
                        className="main_player__range player_range" 
                        onChange={timeChangeInputHandle}
                        value={currentTime || 0}
                        max={+audio.duration || 100}
                    />
                    <div className="main_player__total_duration">{duration ? formatSecondsAsTime(duration) : "00:00"}</div>
                </div>
                <div className="main_player__buttons main_player__item">
                    <div className="main_player__btn player_btn player_btn--prev" onClick={() => playNext(false)}>
                        <i className="fa fa-step-backward"></i>
                    </div>
                    <div className="main_player__btn player_btn player_btn--pause" onClick={togglePlayPause} >
                    {
                        isPlaying 
                        ? <i className="fa fa-pause-circle fa-2x"></i>
                        : <i className="fa fa-play-circle fa-2x"></i>
                    }
                    </div>
                    <div className="main_player__btn player_btn player_btn--next" onClick={() => playNext(true)} >
                        <i className="fa fa-step-forward"></i>
                    </div>
                </div>
                <div className="main_player__volume main_player__item">
                    <div className="main_player__volume_down" onClick={() => volume === 0 ? setVolume(0.1) : setVolume(0)}>
                        <i className="fa fa-volume-down"></i>
                    </div>
                    <input 
                        type="range" 
                        className="player_range main_player__volume_range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        onChange={(e) => setVolume(e.target.value)}
                        value={volume}
                    />
                    {/* <div className="main_player__volume_up"><i className="fa fa-volume-up"></i></div> */}
                </div>
            </div>
        </div>
    )
}

export default Player
