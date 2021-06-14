import React, { useState, useEffect } from 'react'
import {Button, Form, Modal, Alert} from 'react-bootstrap'
import { connect } from 'react-redux';
import { pause, play } from '../../redux/MusicPlayerReducer';
import { likeSong, unlikeSong } from '../../redux/MusicReducer';
import { addSongToPlaylistStart } from '../../redux/PlaylistsReducer';
import MusicItem from './MusicItem';
import './Music.scss';

const Music = (props) => {
    const { music, likedMusic, myPlaylists, playerState, play, pause,
        addSongToPlaylist, removeSongFromPlaylist, canRemove, playlist, likeSong, unlikeSong } = props
    
    const myCustomPlaylists = myPlaylists && myPlaylists.filter(list => list.custom)
    // const myCustomPlaylists = playlists

    const [selectedPlaylistId, setSelectedPlaylistId] = useState()
    const [songToAdd, setSongToAdd] = useState(null)
    const [modalActive, setModalActive] = useState(false)

    useEffect(() => {
        myCustomPlaylists && setSelectedPlaylistId(myCustomPlaylists[0]?.id)
    }, [myCustomPlaylists])

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

    if (music?.length <= 0) return <Alert variant="info" >There are no songs here</Alert>
    return (
        <>
        <div className="music">
            <ul className="music__list">
                {
                    music && music.map(song => {
                        return <MusicItem 
                            key={"song-"+song.id}
                            song={song}
                            playerState={playerState}
                            play={play}
                            pause={pause}
                            likedMusic={likedMusic}
                            isLiked={likedMusic ? likedMusic[song.id] : false}
                            likeSong={likeSong}
                            unlikeSong={unlikeSong}
                            setModalActive={showModalHandle}
                            canRemove={canRemove}
                            playlist={playlist}
                            removeSongFromPlaylist={removeSongFromPlaylist}
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
                                        <option key={"list-"+list.id} value={list.id}>
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
})

const mapDispatchToProps = dispatch => ({
    pause: () => dispatch(pause()),
    play: songId => dispatch(play(songId)),
    // likeSongToggle: song => dispatch(likeSongToggle(song)),
    addSongToPlaylist: (playlistId, song) => dispatch(addSongToPlaylistStart(playlistId, song)),
    likeSong: (song) => dispatch(likeSong(song)),
    unlikeSong: (song) => dispatch(unlikeSong(song)),
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Music)
