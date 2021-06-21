import React, { useState } from 'react'
import {Button, Form, Modal, Alert} from 'react-bootstrap'
import { connect } from 'react-redux';
import { pause, play } from '../../redux/MusicPlayerReducer';
import { likeSong, unlikeSong } from '../../redux/MusicReducer';
import { addSongToPlaylistStart } from '../../redux/PlaylistsReducer';
import MusicItem from './MusicItem';
import './Music.scss';

const Music = (props) => {
    const {
        music, likedMusic, myPlaylists, playerState, play, pause,
        addSongToPlaylist, removeSongFromPlaylist,
        canRemove, playlist, likeSong, unlikeSong, user, isAuth
    } = props

    const myCustomPlaylists = myPlaylists && myPlaylists.filter(list => list && list.custom)
    // const myCustomPlaylists = myPlaylists

    const [selectedPlaylistId, setSelectedPlaylistId] = useState((myCustomPlaylists && myCustomPlaylists[0]?._id) || "")
    const [songToAdd, setSongToAdd] = useState(null)
    const [modalActive, setModalActive] = useState(false)

    if (music?.length <= 0) return <Alert variant="info" >There are no songs here</Alert>
    
    const showModalHandle = (modalActive, song) => {
        setSongToAdd(song)
        setModalActive(modalActive)
    }
    
    const addSongHandle = () => {
        if (selectedPlaylistId && songToAdd) {
            addSongToPlaylist(selectedPlaylistId, songToAdd)
            setModalActive(false)
        }
    }
    const likeSongHandler = (isLike, song) => {
        if (user?.id) {
            isLike 
            ? likeSong(user.id, song)
            : unlikeSong(user.id, song)
        }
    }
    
    return (
        <>
        <div className="music">
            <ul className="music__list">
                {
                    music && music.map(song => {
                        return <MusicItem 
                            key={"song-"+song._id}
                            song={song}
                            playerState={playerState}
                            play={play}
                            pause={pause}
                            likedMusic={likedMusic}
                            isLiked={likedMusic ? likedMusic[song.id] : false}
                            likeSongToggle={likeSongHandler}
                            setModalActive={showModalHandle}
                            canRemove={canRemove}
                            playlist={playlist}
                            removeSongFromPlaylist={removeSongFromPlaylist}
                            isAuth={isAuth}
                        />
                    })
                }
            </ul>
        </div>
        <Modal centered show={modalActive} onHide={() => setModalActive(false)} >
            <Modal.Header closeButton>
                <Modal.Title>Add to your Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                    {
                        myCustomPlaylists && myCustomPlaylists.length
                        ?
                        <>
                            <Form.Label>Select Playlist</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) => setSelectedPlaylistId(e.target.value)}
                                value={selectedPlaylistId}
                            >
                            {
                                myCustomPlaylists.map(list =>
                                    <option key={"list-"+list._id} value={list._id}>
                                        {list.title}
                                    </option>
                                )
                            }
                            </Form.Control>
                        </>
                        : <Alert variant="danger" >Please create custom playlist!</Alert>

                    }
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setModalActive(false)}>Close</Button>
                <Button variant="primary" onClick={addSongHandle}>Add</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    playerState: state.player,
    likedMusic: state.music.liked.list, 
    myPlaylists: state.playlists.my.list,
    user: state.auth.user,
    isAuth: state.auth.isAuth,
})

const mapDispatchToProps = dispatch => ({
    pause: () => dispatch(pause()),
    play: songId => dispatch(play(songId)),
    addSongToPlaylist: (playlistId, song) => dispatch(addSongToPlaylistStart(playlistId, song)),
    likeSong: (userId, song) => dispatch(likeSong(userId, song)),
    unlikeSong: (userId, song) => dispatch(unlikeSong(userId, song)),
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Music)
