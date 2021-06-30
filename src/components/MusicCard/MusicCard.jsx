import React from 'react'
import { useState } from 'react';
import { connect } from 'react-redux';
import { Button, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import './MusicCard.scss';

const MusicCard = ({content, isPlaylist = false, deleteFromMyPlaylists, deleteFromMyMusic, addToMyMusic, editMyPlaylist, addToMyPlaylists, isAuth, isMy, user}) => {

    const {_id: id, title, plays, likes, artist, img, creator} = content

    const [isEditMode, setIsEditMode] = useState(false)
    const [titleEditMode, setTitleEditMode] = useState("" || title)
    
    const buttons = {}

    if (isPlaylist) {
        if (isMy) {
            buttons.text = 'Remove from my playlists'
            buttons.fun = () => deleteFromMyPlaylists(content)
        }
        else {
            buttons.text = 'Add playlist to my'
            buttons.fun = () => addToMyPlaylists(content)
        }
    }
    else {
        if (isMy) {
            buttons.text = 'Remove from my music'
            buttons.fun = () => deleteFromMyMusic(content)
        }
        else {
            buttons.text = 'Add song'
            buttons.fun = () => addToMyMusic(content)
        }
    }

    const editMyPlaylistHandler = () => {
        editMyPlaylist(content, {title: titleEditMode})
        setIsEditMode(false)
    }

    const dropdown = (
        <DropdownButton id="dropdown-basic-button" title="Actions" className="mr-2">
        {
            isPlaylist && isMy && creator === user?.id && !isEditMode &&
            <Dropdown.Item onClick={() => setIsEditMode(true)}>Edit</Dropdown.Item>
        }
        {
            isAuth && <Dropdown.Item onClick={buttons.fun}>{buttons.text}</Dropdown.Item>
        }
        </DropdownButton>
    )

    return (
        <div className="song_card">
            <div className="myRow">
                <div className="song_card__wrapper">
                    <img src={img} alt="" className="song_card__img"/>
                </div>
                <div className="song_card__inner">
                    <div className="song_card__details">
                        {
                            isEditMode 
                            ?
                            <Form.Control
                                type="text"
                                value={titleEditMode}
                                onChange={e => setTitleEditMode(e.target.value)}
                            />
                            :
                            <h2 className="song_card__title">{title}</h2>
                        }
                        <h3 className="song_card__details_item song_card__details_item--last">{artist}</h3>
                        <div className="song_card__details_item">{plays} Plays</div>
                        <div className="song_card__details_item">{likes} Likes</div>
                        {
                            isPlaylist && <div className="song_card__details_item">{content.music?.length || 0} Songs</div>
                        }
                    </div>
                    <div className="song_card__right">
                        <div className="song_card__right_inner">
                            {   
                            isAuth && isEditMode 
                                ?
                                <>
                                    <Button className="ml-2" variant="primary" onClick={editMyPlaylistHandler} >
                                        Save
                                    </Button>
                                    <Button className="ml-2" variant="secondary" onClick={() => setIsEditMode(false)} >
                                        Close
                                    </Button>
                                </>
                                : isAuth && dropdown
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(MusicCard)
