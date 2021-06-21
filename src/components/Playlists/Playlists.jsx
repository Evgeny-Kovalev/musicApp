import React, { useState } from 'react'
import PlaylistItem from './PlaylistItem';
import {Alert, Button, Form, Modal} from 'react-bootstrap'
import { connect } from 'react-redux';
import { createNewMyPlaylistStart } from '../../redux/PlaylistsReducer';
import './Playlists.scss';

const Playlists = ({playlists, createNewMyPlaylist, withAdding, limit, isAuth, user}) => {

    const [modalActive, setModalActive] = useState(false);
    const [newPlaylistTitle, setNewPlaylistTitle] = useState("")

    const handleCreateNewPlaylist = () => {
        if (newPlaylistTitle !== "" && user?.id) {
            const playlist = {
                title: newPlaylistTitle,
                img: "https://via.placeholder.com/1000"
            }
            createNewMyPlaylist(user.id, playlist)
        }
        setNewPlaylistTitle("")
        setModalActive(false)
    }

    const playlistsEl = []

    let idx = 0

    for (let playlist of playlists) {
        if (idx === limit) break

        playlist && playlistsEl.push(
            <PlaylistItem
                key={"p-" + playlist._id}
                id={playlist._id}
                title={playlist.title}
                img={playlist.img}
                musicCount={playlist?.music?.length}
                playsCount={playlist.plays}
            />
        )
        idx++
    }

    return (
        <>
            {
                playlists.length <= 0 && <Alert variant="info" >There are no playlists here</Alert>
            }
            <div className="playlists">
                <ul className="playlists__list myRow">
                    {
                        withAdding && isAuth && 
                        <li className="playlists__item playlists__item--add" onClick={() => setModalActive(true)} >
                            <div className="playlists__add"></div>
                        </li>
                    }
                    {playlistsEl}
                </ul>
            </div>
            <Modal centered show={modalActive} onHide={() => setModalActive(false)} >
				<Modal.Header closeButton>
					<Modal.Title>Create new playlist</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Your playlist name</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Playlist title..."
                                onChange={(e) => setNewPlaylistTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Select image</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setModalActive(false)}>Close</Button>
					<Button variant="primary" onClick={handleCreateNewPlaylist}>Create</Button>
				</Modal.Footer>
			</Modal>
        </>
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
    createNewMyPlaylist: (userId, playlist) => dispatch(createNewMyPlaylistStart(userId, playlist))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlists)
