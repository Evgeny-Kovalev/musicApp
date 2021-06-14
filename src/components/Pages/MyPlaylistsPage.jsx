import React, { useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { initMyPlaylists } from '../../redux/PlaylistsReducer'
import Playlists from '../Playlists/Playlists'
import Title from '../Title/Title'

const MyPlaylistsPage = ({myPlaylists, myPlaylistsError, playlistsLoading, initMyPlaylists}) => {

    useEffect(() => {
        initMyPlaylists()
    }, [initMyPlaylists])

    
    let playlists = myPlaylistsError 
    ? <Alert variant="danger" >Music can't be loaded!</Alert>
    : <Spinner animation="border" role="status"></Spinner>
    
    if (myPlaylists) {
        playlists = <Playlists playlists={myPlaylists} withAdding />
    }
    return (
        <>
            <Title>My Playlists</Title>
            { playlists }
        </>
    )
}
const mapStateToProps = state => ({
    myPlaylists: state.playlists.my.list,
    myPlaylistsError: state.playlists.my.error,
})

const mapDispatchToProps = dispatch => ({
    initMyPlaylists: () => dispatch(initMyPlaylists()),
})


export default connect(mapStateToProps, mapDispatchToProps)(MyPlaylistsPage)
