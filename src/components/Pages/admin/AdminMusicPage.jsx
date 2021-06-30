import React, { useEffect, useState } from 'react'
import TableLayout from '../../AdminComponents/TableLayout/TableLayout'
import { connect } from 'react-redux'
import { addNewMusic, getMusic, removeSong } from '../../../redux/AdminReducer'
import { Form, Col, Row } from 'react-bootstrap'

const AdminMusicPage = ({user, music, getMusic, addNewMusic, removeSong}) => {
    
    useEffect(() => {
        getMusic(user)
    }, [])

    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("")
    const [songImage, setSongImage] = useState()
    const [songFile, setSongFile] = useState("")

    const [showAddForm, setShowAddForm] = useState(false)

    const addMusicHandler = (e) => {
        e.preventDefault()
        if (showAddForm && title && artist && songImage && songFile) {
            const formData = new FormData()
            formData.append('img', songImage)
            formData.append('song', songFile)
            formData.append('title', title)
            formData.append('artist', artist)
            addNewMusic(user, formData)
            setTitle("")
            setArtist("")
        }
        else setShowAddForm(true)
    }

    
    const onRemoveSongHandler = (song) => {
        removeSong(user, song)
    }
    
    const dataToShow = {
        title: "Title",
        img: "Image",
        artist: "Artist",
        plays: 'Plays',
        likes: 'Likes',
    }
    
    return (
        <>
            <Row className="g-2">
                <Col md>
                    <h1 className="h2 pt-3 pb-2 mb-2">Music</h1>
                </Col>
            </Row>
            <Form onSubmit={addMusicHandler} >
                { showAddForm &&
                <>
                    <Row className="g-2">
                        <Col md>
                            <Form.Group className="mb-3" >
                                <Form.Label>Song title</Form.Label>
                                <Form.Control
                                    name="title"
                                    type="text"
                                    placeholder="Title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group className="mb-3" >
                                <Form.Label>Artist name</Form.Label>
                                <Form.Control name="artist"
                                    type="text"
                                    placeholder="Artist..."
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col md>
                            <Form.Group className="mb-3" >
                                <Form.Label>Choose some music <b>file</b> to add</Form.Label>
                                <Form.Control
                                    name="song"
                                    type="file"
                                    onChange={(e) => setSongFile(e.target.files[0])}
                                />
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group className="mb-3" >
                                <Form.Label>Choose song <b>image</b></Form.Label>
                                <Form.Control
                                    name="img"
                                    type="file"
                                    onChange={(e) => setSongImage(e.target.files[0])}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </>
                }
                <Row className="mb-3" >
                    <Col md>
                        <button className="btn btn-primary mr-3" type="submit">
                            Add New
                        </button>
                        {
                        showAddForm &&
                        <button className="btn btn-secondary" onClick={() => setShowAddForm(false)} >
                            Close
                        </button>
                        }
                    </Col>
                </Row>
            </Form>
            <Row className="g-2" >
                <Col md>
                    <TableLayout content={music} data={dataToShow} onRemove={onRemoveSongHandler}/>
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => ({
    music: state.admin.music,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    getMusic: (user) => dispatch(getMusic(user)),
    addNewMusic: (user, music) => dispatch(addNewMusic(user, music)),
    removeSong: (user, song) => dispatch(removeSong(user, song)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminMusicPage)
