import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { addToMyPlaylists, removeFromMyPlaylists, initMyPlaylists, initPlaylist, removeSongFromPlaylistStart, setCurrentPlaylist } from '../../redux/PlaylistsReducer'
import Music from '../Music/Music'
import MusicCard from '../MusicCard/MusicCard'

const PlaylistPage = (props) => {

    const {
        myPlaylists, removeSongFromPlaylist, initPlaylist,
        currentPlaylist, removeFromMyPlaylists, addToMyPlaylists,
        initMyPlaylists, user
    } = props

    const {playlistId} = useParams()

    useEffect(() => {
        if (user?.id) {
            initMyPlaylists(user.id)
        }
        if (playlistId) {
            initPlaylist(playlistId)
        }
    }, [initPlaylist, playlistId])

    const removeSongHandle = (song) => {
        removeSongFromPlaylist(currentPlaylist._id, song)
    }

    const deletePlaylistHandle = (playlist) => {
        if (user?.id) {
            removeFromMyPlaylists(user.id, playlist)
        }
    }
    const addToMyPlaylistsHandle = (playlist) => {
        if (user?.id) {
            addToMyPlaylists(user.id, playlist)
        }
    }

    const isMyPlaylist = myPlaylists && myPlaylists.some(myPlaylist => myPlaylist && myPlaylist._id.toString() === playlistId.toString())

    return (
        <>
            <MusicCard
                id={playlistId}
                content={currentPlaylist}
                addToMyPlaylists={addToMyPlaylistsHandle}
                deleteFromMyPlaylists={deletePlaylistHandle}
                isPlaylist
                isMy={isMyPlaylist}
            />
            {
                currentPlaylist && currentPlaylist.music && 
                <Music 
                    music={currentPlaylist.music} 
                    canRemove={currentPlaylist.custom && isMyPlaylist}
                    removeSongFromPlaylist={currentPlaylist.custom && removeSongHandle}
                    playlist={currentPlaylist}
                />
            }
        </>
    )
}

const mapStateToProps = state => ({
    currentPlaylist: state.playlists.currentPlaylist,
    myPlaylists: state.playlists.my.list,
    user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
    removeSongFromPlaylist: (playlist, song) => dispatch(removeSongFromPlaylistStart(playlist, song)),
    initPlaylist: playlistId => dispatch(initPlaylist(playlistId)),
    initMyPlaylists: () => dispatch(initMyPlaylists()),
    initMyPlaylists: (userId) => dispatch(initMyPlaylists(userId)),
    removeFromMyPlaylists: (userId, playlistId) => dispatch(removeFromMyPlaylists(userId, playlistId)),
    addToMyPlaylists: (userId, playlist) => dispatch(addToMyPlaylists(userId, playlist)),
    setCurrentPlaylist: playlistId => dispatch(setCurrentPlaylist(playlistId)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage)
