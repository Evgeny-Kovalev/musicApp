import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'

const MusicItem = React.memo((props) => {
    
    const {
        song, play, pause, playerState,
        setModalActive, removeSongFromPlaylist, canRemove, likeSongToggle, isAuth, isLikedSong
    } = props

    const {_id : id, title, artist, img} = song

    const history = useHistory()

    const playClickHandler = () => {
        const playsCount = localStorage.getItem('playsCount')
        if (!isAuth && playsCount >= 10) 
            history.push('/auth')
        else 
            play(song)
    }

    return (
        <li className="music__item song">
            <NavLink to={"/song/"+id} className="song__link">
                <img src={img} alt="" className="song__img"/>
                {
                    playerState.currentSong?._id=== id && playerState.playing &&
                    <img src="/img/eq.svg" alt="" className="song__img_animation"/>
                }
            </NavLink>
            <button
                className="song__play"
                onClick={playerState.currentSong?._id === id && playerState.playing ? pause : playClickHandler}
            >
            {
                playerState.currentSong?._id === id && playerState.playing
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
}, (props, nextProps) => {
    return props.song === nextProps.song && 
        props.playerState.playing === nextProps.playerState.playing && 
        props.playerState.currentSong === nextProps.playerState.currentSong &&
        props.likedMusic === nextProps.likedMusic &&
        props.isLikedSong === nextProps.isLikedSong
})

export default MusicItem
