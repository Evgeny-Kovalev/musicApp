import React from 'react'
import { NavLink } from 'react-router-dom'
// import { numFormatter } from '../../helpers'

const PlaylistItem = ({id, title, img, musicCount, playsCount}) => {

    return (
        <li className="playlists__item">
            {/* <div className="playlists__remove">
                <i class="far fa-times-circle fa-2x"></i>
            </div> */}
            <NavLink to={"/playlist/"+id} className="playlists__link">
                <div className="playlists__inner">
                    <img src={img} alt="" className="playlists__img"/>
                    <div className="playlists__actions actions">
                        <div className="actions__count">
                            <i className="fas fa-align-left"></i>{musicCount || 0}
                        </div>
                        {/* <div className="actions__listens">
                            <i className="fas fa-headphones-alt"></i>{numFormatter(playsCount)}
                        </div> */}
                        {/* <div className="actions__remove">
                            <i className="fas fa-times"></i>
                        </div> */}
                    </div>

                </div>
                <div className="playlists__title">{title}</div>
            </NavLink>
        </li>
    )
}

export default PlaylistItem
