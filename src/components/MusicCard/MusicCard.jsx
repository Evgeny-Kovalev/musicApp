import React from 'react'
import { withRouter } from 'react-router';
import CircleBtn from '../Buttons/CircleBtn';
import './MusicCard.scss';

const MusicCard = ({content, isPlaylist = false, deletePlaylist}) => {

    if (!content) return null
    const {id, title, plays, likes, artist, img} = content

    return (
        <div className="song_card">
            <div className="myRow">
                <div className="song_card__wrapper">
                    <img src={img} alt="" className="song_card__img"/>
                </div>
                <div className="song_card__inner">
                    <div className="song_card__details">
                        <h2 className="song_card__title">{title}</h2>
                        <h3 className="song_card__details_item song_card__details_item--last">{artist}</h3>
                        <div className="song_card__details_item">{plays} Plays</div>
                        <div className="song_card__details_item">{likes} Likes</div>
                        {
                            isPlaylist && <div className="song_card__details_item">{content.music?.length || 0} Songs</div>
                        }
                    </div>
                    <div className="song_card__right">
                        <div className="song_card__right_inner">
                            {/* <CircleBtn 
                                className="song_card__circle_item" 
                                type="like" 
                                isActive={isLiked} 
                                onClick={onLikeSongClick}
                            /> */}
                            {
                                isPlaylist &&
                                <CircleBtn
                                    className="song_card__circle_item" 
                                    type="close" 
                                    onClick={() => deletePlaylist(id)}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(MusicCard)
