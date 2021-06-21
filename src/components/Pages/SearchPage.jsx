import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import {searchMusic } from '../../redux/MusicReducer'
import Music from '../../components/Music/Music'
import { Alert } from 'react-bootstrap'

const SearchPage = ({searchedMusic, searchMusic}) => {

    const {value} = useParams()

    useEffect(() => {
        searchMusic(value)
    }, [value])

    return (
        searchedMusic
        ? searchedMusic.length <= 0 ? "LOADING" : <Music music={searchedMusic} />
        : <Alert variant="info" >No such music found</Alert>
    )
}

const mapStateToProps = state => ({
    searchedMusic: state.music.search.list,
})

const mapDispatchToProps = dispatch => ({
    searchMusic: (songName) => dispatch(searchMusic(songName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
