import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { formatSecondsAsTime } from './../../helpers';


const MusicItem = ({id, title, artist, img, playSong, isPlaying, activeTrack}) => {

    const [duration, setDuration] = useState(0)

    useEffect(() => {
        const audio = new Audio(`http://localhost:3000/music/${id}.mp3`)
        audio.duration || (audio.onloadedmetadata = () => setDuration(audio.duration))
    })

    return (
        <li className="music__item song">
            <NavLink to={"song/"+id} className="song__link">
                <img src={img} alt="" className="song__img"/>
            </NavLink>
            <button className="song__play" onClick={() => playSong(id)} >
            {
                activeTrack === id && isPlaying
                ? <i className="fas fa-pause"></i>
                : <i className="fas fa-play"></i>
            }
            </button>
            <div className="song__name">
                <NavLink to={"song/" + id} className="song__link">
                    {title}
                </NavLink>
            </div>
            <div className="song__artist">{artist}</div>
            <div className="song__duration">{formatSecondsAsTime(duration)}</div>
            <button className="song__like"><i className="fas fa-heart"></i></button>
        </li>
    )
}

export default MusicItem
