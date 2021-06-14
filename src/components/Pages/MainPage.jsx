import React, { useEffect } from 'react'
import { Spinner, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { initLikedMusic, initMyMusic } from '../../redux/MusicReducer'
import { initMyPlaylists } from '../../redux/PlaylistsReducer'
import Music from '../Music/Music'
import Playlists from '../Playlists/Playlists'
import Title from '../Title/Title'

const MainPage = ({myMusic, myPlaylists, initMyMusic, initMyPlaylists, myPlaylistsError, myMusicError, initLikedMusic}) => {
    useEffect(() => {
        initLikedMusic()
        initMyPlaylists()
        initMyMusic()
    }, [initMyMusic, initMyPlaylists ])

    let playlists = myPlaylistsError 
        ? <Alert variant="danger" >Playlists can't be loaded!</Alert>
        : <Spinner animation="border" role="status"></Spinner>

    if (myPlaylists) {
        playlists = <Playlists playlists={myPlaylists} limit={5} />
    }


    let music = myMusicError 
        ? <Alert variant="danger" >Music can't be loaded!</Alert>
        : <Spinner animation="border" role="status"></Spinner>
    
    if (myMusic) {
        music = <Music music={myMusic} />
    }

    return (
        <>
            <Title type="full" subtitle="View All" to="/playlists/" >My Last Playlists</Title>
            { playlists }
            <Title type="subtitle" subtitle={(myMusic?.length || "0") + " Songs"} >My music</Title>
            { music }
        </>
    )
}

const mapStateToProps = state => ({
    myMusic: state.music.my.list,
    mymyMusicError: state.music.my.error,
    
    myPlaylists: state.playlists.my.list,
    myPlaylistsError: state.playlists.my.error
})

const mapDispatchToProps = dispatch => ({
    initLikedMusic: () => dispatch(initLikedMusic()),
    initMyMusic: () => dispatch(initMyMusic()),
    initMyPlaylists: () => dispatch(initMyPlaylists()),
})


export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
