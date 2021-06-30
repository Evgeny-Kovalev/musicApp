import React, { useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { initPopularMusic } from '../../redux/MusicReducer'
import { initPopularPlaylists } from '../../redux/PlaylistsReducer'
import Music from '../Music/Music'
import Playlists from '../Playlists/Playlists'
import Title from '../Title/Title'

const PopularPage = ({popularMusic, popularPlaylists, initPopularMusic, initPopularPlaylists, loading, musicError, playlistsError, user}) => {

    useEffect(() => {
        initPopularMusic(user)
        initPopularPlaylists()
    }, [initPopularMusic, initPopularPlaylists])

    let music = popularMusic.error 
        ? <Alert variant="danger" >Music can't be loaded!</Alert>
        : <Spinner animation="border" role="status"></Spinner>

    if (popularMusic.loading) music = <Spinner animation="border" role="status"></Spinner>

    if (popularMusic.list) music = <Music music={popularMusic.list} />
    
    let playlists = popularPlaylists.error 
        ? <Alert variant="danger" >Playlist can't be loaded!</Alert>
        : <Spinner animation="border" role="status"></Spinner>

    if (popularPlaylists.loading) playlists = <Spinner animation="border" role="status"></Spinner>
    if (popularPlaylists.list) playlists = <Playlists playlists={popularPlaylists.list} limit={12} />


    return (
        <>
            <Title>Most popular playlists</Title>
            {playlists}
            <Title>Most popular music</Title>
            {music}
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    popularMusic: state.music.popular,
    popularPlaylists: state.playlists.popular,
})

const mapDispatchToProps = dispatch => ({
    initPopularMusic: (user) => dispatch(initPopularMusic(user)),
    initPopularPlaylists: () => dispatch(initPopularPlaylists())
})

export default connect(mapStateToProps, mapDispatchToProps)(PopularPage)
