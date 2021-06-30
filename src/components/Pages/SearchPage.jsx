import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import {searchMusic } from '../../redux/MusicReducer'
import Music from '../../components/Music/Music'
import { Alert } from 'react-bootstrap'

const SearchPage = ({user, searchedMusic, searchMusic}) => {

    const {value} = useParams()

    useEffect(() => {
        searchMusic(user, value)
    }, [value])

    return (
        searchedMusic
        ? searchedMusic.length <= 0 ? "LOADING" : <Music music={searchedMusic} />
        : <Alert variant="info" >No such music found</Alert>
    )
}

const mapStateToProps = state => ({
    searchedMusic: state.music.search.list,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    searchMusic: (user, songName) => dispatch(searchMusic(user, songName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
