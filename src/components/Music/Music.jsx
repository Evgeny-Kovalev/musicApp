import React, { useState, useEffect } from 'react'
import {Button, Form, Modal, Alert} from 'react-bootstrap'
import { connect } from 'react-redux';
import { pause, play } from '../../redux/MusicPlayerReducer';
import { likeSong, unlikeSong } from '../../redux/MusicReducer';
import { addSongToPlaylist } from '../../redux/PlaylistsReducer';
import MusicItem from './MusicItem';
import './Music.scss';

const Music = React.memo(props => {
    const {
        music, likedMusic, myPlaylists, playerState, play, pause,
        addSongToPlaylist, removeSongFromPlaylist,
        canRemove, playlist, likeSong, unlikeSong, user, isAuth
    } = props

    const [myCustomPlaylists, setMyCustomPlaylists] = useState()
    const [selectedPlaylistId, setSelectedPlaylistId] = useState()
    const [songToAdd, setSongToAdd] = useState(null)
    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        myPlaylists && setMyCustomPlaylists(myPlaylists.filter(list => list && list.custom))
    }, [myPlaylists])

    useEffect(() => {
        myCustomPlaylists && setSelectedPlaylistId(myCustomPlaylists[0]?._id)
    }, [myCustomPlaylists])

    if (music?.length <= 0) return <Alert variant="info" >There are no songs here</Alert>
    
    const showModalHandle = (modalActive, song) => {
        setSongToAdd(song)
        setModalActive(modalActive)
    }
    
    const addSongHandler = () => {
        if (user && selectedPlaylistId && songToAdd) {
            addSongToPlaylist(user, selectedPlaylistId, songToAdd)
            setModalActive(false)
        }
    }
    const likeSongHandler = (isLike, song) => {
        if (user?.id) {
            isLike 
            ? likeSong(user, song)
            : unlikeSong(user, song)
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
                            isLikedSong={likedMusic &&likedMusic.find(likedSong => likedSong._id === song._id)}
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
        <AddSongToPlaylistModal
            show={modalActive}
            onHide={() => setModalActive(false)}
            addSongHandler={addSongHandler}
            selectedPlaylistId={selectedPlaylistId}
            setSelectedPlaylistId={setSelectedPlaylistId}
            playlists={myCustomPlaylists}
        />
        </>
    )
}, (props, nextProps) => {
    return props.music === nextProps.music &&
        props.myPlaylists === nextProps.myPlaylists &&
        props.playerState.playing === nextProps.playerState.playing &&
        props.playerState.currentSong === nextProps.playerState.currentSong &&
        props.likedMusic === nextProps.likedMusic
})

const AddSongToPlaylistModal = React.memo((props) => {
    const { show, onHide, addSongHandler, selectedPlaylistId, setSelectedPlaylistId, playlists } = props
    return (
        <Modal centered show={show} onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title>Add to your Playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                    {
                        playlists && playlists.length
                        ?
                        <>
                            <Form.Label>Select Playlist</Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) => setSelectedPlaylistId(e.target.value)}
                                value={selectedPlaylistId}
                            >
                            {
                                playlists.map(list =>
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
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={addSongHandler}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}, (prev, nextState) => {
    return prev.show === nextState.show &&
    prev.playlists === nextState.playlists &&
    prev.selectedPlaylistId === nextState.selectedPlaylistId
})

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
    addSongToPlaylist: (user, playlistId, song) => dispatch(addSongToPlaylist(user, playlistId, song)),
    likeSong: (user, song) => dispatch(likeSong(user, song)),
    unlikeSong: (user, song) => dispatch(unlikeSong(user, song)),
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Music)
