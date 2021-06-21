import React from 'react'
import { connect } from 'react-redux';
    import CircleBtn from '../Buttons/CircleBtn';
import './MusicCard.scss';

const MusicCard = ({content, isPlaylist = false, deleteFromMyPlaylists, deleteFromMyMusic, addToMyMusic, addToMyPlaylists, isAuth, isMy}) => {

    if (!content) return null
    const {_id: id, title, plays, likes, artist, img} = content

    let buttons = null

    if (isAuth) {
        if (isPlaylist) {
            buttons = isMy
            ? 
            <CircleBtn
                className="song_card__circle_item" 
                type="close" 
                onClick={() => deleteFromMyPlaylists(content)}
            />
            :
            <CircleBtn
                className="song_card__circle_item" 
                type="add" 
                onClick={() => addToMyPlaylists(content)}
            />
        }
        else {
            buttons = isMy
            ? 
            <CircleBtn
                className="song_card__circle_item" 
                type="close" 
                onClick={() => deleteFromMyMusic(content)}
            />
            :
            <CircleBtn
                className="song_card__circle_item" 
                type="add" 
                onClick={() => addToMyMusic(content)}
            />
        }
    }

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
                            { buttons }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = dispatch => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(MusicCard)
