import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setSearchValue, searchMusic } from '../../redux/MusicReducer'
import Music from '../../components/Music/Music'
import { Alert } from 'react-bootstrap'

const SearchPage = ({setSearchValue, searchedMusic, searchValue, searchMusic}) => {

    const {value} = useParams()

    useEffect(() => {
        setSearchValue(value)
        searchMusic(value)
    }, [])

    return (
        searchedMusic?.length
        ? <Music music={searchedMusic} />
        : <Alert variant="info" >No such music found</Alert>
    )
}

const mapStateToProps = state => ({
    searchedMusic: state.music.search.list,
    searchValue: state.music.search.value,
})

const mapDispatchToProps = dispatch => ({
    searchMusic: (songName) => dispatch(searchMusic(songName)),
    setSearchValue: (songName) => dispatch(setSearchValue(songName))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
