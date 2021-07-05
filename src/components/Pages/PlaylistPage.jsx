import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { addToMyPlaylists, removeFromMyPlaylists, initMyPlaylists, initPlaylist, removeSongFromPlaylist, setCurrentPlaylist, editMyPlaylist } from '../../redux/PlaylistsReducer'
import Music from '../Music/Music'
import MusicCard from '../MusicCard/MusicCard'

const PlaylistPage = (props) => {

    const {
        myPlaylists, removeSongFromPlaylist, initPlaylist,
        currentPlaylist, removeFromMyPlaylists, addToMyPlaylists,
        initMyPlaylists, user, editMyPlaylist
    } = props

    const {playlistId} = useParams()

    useEffect(() => {
        if (user?._id) {
            initMyPlaylists(user)
        }
        if (playlistId) {
            initPlaylist(playlistId)
        }
    }, [initPlaylist, playlistId])

    const removeSongHandle = (song) => {
        user?._id && removeSongFromPlaylist(user, currentPlaylist._id, song)
    }

    const deletePlaylistHandle = (playlist) => {
        if (user?._id) {
            removeFromMyPlaylists(user, playlist)
        }
    }
    const addToMyPlaylistsHandle = (playlist) => {
        if (user?._id) {
            addToMyPlaylists(user, playlist)
        }
    }

    const editMyPlaylistHandler = (playlist, newData) => {
        editMyPlaylist(user, playlist, newData)
    }

    const isMyPlaylist = myPlaylists && myPlaylists.some(myPlaylist => myPlaylist && myPlaylist._id.toString() === playlistId.toString())

    return (
        <>
            {
            currentPlaylist && 
            <MusicCard
                id={playlistId}
                content={currentPlaylist}
                addToMyPlaylists={addToMyPlaylistsHandle}
                deleteFromMyPlaylists={deletePlaylistHandle}
                editMyPlaylist={editMyPlaylistHandler}
                isPlaylist
                isMy={isMyPlaylist}
            />
            }
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
    removeSongFromPlaylist: (user, playlist, song) => dispatch(removeSongFromPlaylist(user, playlist, song)),
    initPlaylist: playlistId => dispatch(initPlaylist(playlistId)),
    initMyPlaylists: () => dispatch(initMyPlaylists()),
    initMyPlaylists: (user) => dispatch(initMyPlaylists(user)),
    editMyPlaylist: (user, playlist, newData) => dispatch(editMyPlaylist(user, playlist, newData)),
    removeFromMyPlaylists: (user, playlistId) => dispatch(removeFromMyPlaylists(user, playlistId)),
    addToMyPlaylists: (user, playlist) => dispatch(addToMyPlaylists(user, playlist)),
    setCurrentPlaylist: playlistId => dispatch(setCurrentPlaylist(playlistId)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage)
