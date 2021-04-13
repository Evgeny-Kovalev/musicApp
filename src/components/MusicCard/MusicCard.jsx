import React, { useState } from 'react'
import { withRouter } from 'react-router';
import CircleBtn from '../Buttons/CircleBtn';

const MusicCard = ({content, isPlaylist = false, ...props}) => {

    const id = isPlaylist ? props.match.params.playlistId : props.match.params.songId
    
    const currentContent = content.find(item => item.id === +id)
    const {title, plays, likes, artist, img} = currentContent

    const [isAdded, setIsAdded] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    const onAddSongClick = (e) => {
        setIsAdded(!isAdded)
    }

    const onLikeSongClike = (e) => {
        setIsLiked(!isLiked)
    }

    return (
        <div className="song_card">
            <div className="myRow">
                <div className="song_card__wrapper">
                    <img src={"/"+img} alt="" className="song_card__img"/>
                </div>
                <div className="song_card__inner">
                    <div className="song_card__details">
                        <h2 className="song_card__title">{title}</h2>
                        <h3 className="song_card__details_item song_card__details_item--last">{artist}</h3>
                        <div className="song_card__details_item">{plays} Plays</div>
                        <div className="song_card__details_item">{likes} Likes</div>
                        {
                            isPlaylist && <div className="song_card__details_item">{content.length} Songs</div>
                        }
                    </div>
                    <div className="song_card__right">
                        <div className="song_card__right_inner">

                            <CircleBtn 
                                className="song_card__circle_item" 
                                type="like" 
                                isActive={isLiked} 
                                onClick={onLikeSongClike}
                            />
                            <CircleBtn 
                                className="song_card__circle_item" 
                                type={isAdded ? "close" : "add"} 
                                isActive={isAdded} 
                                onClick={onAddSongClick}
                            />
      
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(MusicCard)
