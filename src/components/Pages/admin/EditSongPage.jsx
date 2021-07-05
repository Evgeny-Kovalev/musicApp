import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {useParams} from 'react-router-dom'
import { initSong } from '../../../redux/MusicReducer'
import { updateSong } from '../../../redux/AdminReducer'
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap'
import Title from '../../Title/Title'

const EditSongPage = ({user, getSong, updateSong}) => {
    const {songId} = useParams() 

    const [song, setSong] = useState()

    useEffect(() => {
        async function fetchData() {
            const song = await getSong(songId)
            setSong(song)
        } 
        fetchData()

    }, [songId])

    const imageUploadHandler = e => {
        setSong(prev => ({
            ...prev,
            imgFile: e.target.files[0],
            img: URL.createObjectURL(e.target.files[0])
        }))
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (song.title && song.artist) {
            const formData = new FormData()
            formData.append('img', song.imgFile)
            formData.append('title', song.title)
            formData.append('artist', song.artist)
            updateSong(user, song, formData)
        }
    }

    
    if (!song) return <Spinner animation="border" role="status"></Spinner>
    return (
        <div>
            <Title>Edit Song</Title>
            <Form onSubmit={formSubmitHandler}>
                <Row>
                    <Col>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title..."
                            value={song.title}
                            onChange={e => setSong(
                                prev => ({ ...prev, title: e.target.value })
                            )}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Artist</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Artist..."
                            value={song.artist}
                            onChange={e => setSong(
                                prev => ({ ...prev, artist: e.target.value })
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Replace image</Form.Label>
                        <img width={64} height={64} className="rounded m-3" src={song.img} alt="song" />
                        <Form.Control
                            type="file"
                            placeholder="Image..."
                            onChange={imageUploadHandler}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button type="submit" variant="primary" className="mt-3" >Save</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    getSong: songId => dispatch(initSong(songId)),
    updateSong: (user, song, formData) => dispatch(updateSong(user, song, formData)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditSongPage)
