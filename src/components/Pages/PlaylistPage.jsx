import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { useHistory } from 'react-router-dom'
import { deletePlaylist, initMyPlaylists, initPlaylist, removeSongFromPlaylistStart, setCurrentPlaylist } from '../../redux/PlaylistsReducer'
import Music from '../Music/Music'
import MusicCard from '../MusicCard/MusicCard'

const PlaylistPage = ({myPlaylists, removeSongFromPlaylist, initPlaylist, currentPlaylist, deletePlaylist, initMyPlaylists}) => {

    const {playlistId} = useParams()
    const history = useHistory()

    useEffect(() => {
        initMyPlaylists()
        initPlaylist(playlistId)
    }, [])

    const removeSongHandle = (song) => {
        removeSongFromPlaylist(currentPlaylist.id, song)
    }

    const deletePlaylistHandle = (playlistsId) => {
        // if (myPlaylists.some(list => list.id.toString() === playlistId.toString()))
        deletePlaylist(playlistsId)
        history.goBack()
    }

    return (
        <>
            <MusicCard
                id={playlistId}
                content={currentPlaylist}
                deletePlaylist={deletePlaylistHandle}
                isPlaylist
            />
            {
                currentPlaylist && currentPlaylist.music && 
                <Music 
                    music={currentPlaylist.music} 
                    canRemove={currentPlaylist.custom}
                    removeSongFromPlaylist={currentPlaylist.custom && removeSongHandle}
                    playlist={currentPlaylist}
                />
            }
        </>
    )
}

const mapStateToProps = state => ({
    // myPlaylists: state.playlists.my.list,
    currentPlaylist: state.playlists.currentPlaylist,
})

const mapDispatchToProps = dispatch => ({
    removeSongFromPlaylist: (playlist, song) => dispatch(removeSongFromPlaylistStart(playlist, song)),
    initPlaylist: playlistId => dispatch(initPlaylist(playlistId)),
    initMyPlaylists: () => dispatch(initMyPlaylists()),
    deletePlaylist: playlistId => dispatch(deletePlaylist(playlistId)),
    setCurrentPlaylist: playlistId => dispatch(setCurrentPlaylist(playlistId)),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage)
