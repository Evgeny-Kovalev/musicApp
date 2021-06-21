import React from 'react'
import { NavLink } from 'react-router-dom'

const MusicItem = ({ song, likedMusic, play, pause, playerState,
     setModalActive, removeSongFromPlaylist, canRemove, likeSongToggle, isAuth }) => {

    const {_id : id, title, artist, img} = song

    const isLikedSong = likedMusic && likedMusic.find(likedSong => likedSong._id === song._id)

    return (
        <li className="music__item song">
            <NavLink to={"/song/"+id} className="song__link">
                <img src={img} alt="" className="song__img"/>
                {
                    playerState.currentSongId === id && playerState.playing &&
                    <img src="/img/eq.svg" alt="" className="song__img_animation"/>
                }
            </NavLink>
            <button className="song__play" onClick={playerState.currentSongId === id && playerState.playing ? pause : () => play(song)}>
            {
                playerState.currentSongId === id && playerState.playing
                ? <i className="fas fa-pause"></i>
                : <i className="fas fa-play"></i>
            }
            </button>
            <div className="song__name">
                <NavLink to={"/song/" + id} className="song__link">{title}</NavLink>
            </div>
            <div className="song__artist">{artist}</div>
            {
                canRemove
                ? isAuth &&
                <div className="song__playlist" onClick={() => removeSongFromPlaylist(song)}>
                    <i className="fas fa-times"></i>
                </div>
                :  isAuth &&
                <div className="song__playlist" onClick={() => setModalActive(true, song)}>
                    <i className="fas fa-folder-plus"></i>
                </div>
            }
            {/* <div className="song__duration"></div> */}
            {
                isAuth &&
                <button 
                    className={`song__like ${isLikedSong ? 'song__like--active' : ''}`} 
                    onClick={() => likeSongToggle(!isLikedSong, song)}
                >
                    <i className="fas fa-heart"></i>
                </button>
            }
        </li>
    )
}

export default MusicItem
