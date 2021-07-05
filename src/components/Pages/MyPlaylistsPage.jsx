import React, { useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { initMyPlaylists } from '../../redux/PlaylistsReducer'
import withAuthRedirect from '../hoc/withAuthRedirect'
import Playlists from '../Playlists/Playlists'
import Title from '../Title/Title'

const MyPlaylistsPage = ({myPlaylists, myPlaylistsError, playlistsLoading, initMyPlaylists, user}) => {

    useEffect(() => {
        if (user?._id) {
            initMyPlaylists(user)
        }
    }, [user._id, initMyPlaylists])

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
    user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
    initMyPlaylists: (user) => dispatch(initMyPlaylists(user)),
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(MyPlaylistsPage)