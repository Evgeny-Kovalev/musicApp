import React, { useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { initPopularMusic } from '../../redux/MusicReducer'
import Music from '../Music/Music'

const PopularPage = ({popularMusic, initPopularMusic, loading, error}) => {

    useEffect(() => {
        initPopularMusic()
    }, [initPopularMusic])


    let music = error 
        ? <Alert variant="danger" >Music can't be loaded!</Alert>
        : <Spinner animation="border" role="status"></Spinner>

    if (loading) music = <Spinner animation="border" role="status"></Spinner>

    if (popularMusic) music = <Music music={popularMusic} />


    return music
}

const mapStateToProps = state => ({
    popularMusic: state.music.popular.list,
    loading: state.music.popular.loading,
    error: state.music.popular.error,
})

const mapDispatchToProps = dispatch => ({
    initPopularMusic: () => dispatch(initPopularMusic())
})

export default connect(mapStateToProps, mapDispatchToProps)(PopularPage)
