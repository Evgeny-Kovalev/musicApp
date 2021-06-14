import React, { useState } from 'react'
import PlaylistItem from './PlaylistItem';
import {Alert, Button, Form, Modal} from 'react-bootstrap'
import { connect } from 'react-redux';
import { createNewPlaylistStart } from '../../redux/PlaylistsReducer';
import './Playlists.scss';

const Playlists = ({playlists, createNewPlaylistStart, withAdding, limit}) => {

    const [modalActive, setModalActive] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("")

    const handleCreateNewPlaylist = () => {
        if (newPlaylistName !== "") {
            const playlist = {
                title: newPlaylistName,
                imageUrl: "https://via.placeholder.com/1000"
            }
            createNewPlaylistStart(playlist)
        }
        setNewPlaylistName("")
        setModalActive(false)
    }

    const playlistsEl = []

    let idx = 0
    for (let playlist of playlists) {
        if (idx === limit) break

        playlistsEl.push(
            <PlaylistItem
                key={"p-" + playlist.id}
                id={playlist.id}
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
                        withAdding &&
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
                                onChange={(e) => setNewPlaylistName(e.target.value)}
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

})

const mapDispatchToProps = dispatch => ({
    createNewPlaylistStart: (playlist) => dispatch(createNewPlaylistStart(playlist))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlists)
