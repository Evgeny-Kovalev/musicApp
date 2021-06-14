import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { initSong } from '../../redux/MusicReducer'
import MusicCard from '../MusicCard/MusicCard'

const SongPage = ({currentSong, initSong}) => {

    const {songId} = useParams()

    useEffect(() => {
        initSong(songId)
    }, [initSong])

    return (
        <MusicCard
            id={songId}
            content={currentSong}
        />
    )
}

const mapStateToProps = state => ({
    currentSong: state.music.currentSong,
})

const mapDispatchToProps = dispatch => ({
    initSong: (songId) => dispatch(initSong(songId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SongPage)
