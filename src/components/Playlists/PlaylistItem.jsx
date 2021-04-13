import React from 'react'
import { NavLink } from 'react-router-dom'

const PlaylistItem = ({id, title, img}) => {
    return (
        <li className="playlists__item">
            <NavLink to={"playlist/"+id} className="playlists__link">
                <img src={img} alt="" className="playlists__img"/>
            </NavLink>
            <div className="playlists__name">{title}</div>
        </li>
    )
}

export default PlaylistItem
