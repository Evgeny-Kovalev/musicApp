import React, { useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { initLikedMusic } from '../../redux/MusicReducer'
import Music from '../Music/Music'
import Title from '../Title/Title'

const LikedMusicPage = ({likedMusic, initLikedMusic, musicError}) => {

    useEffect(() => {
        initLikedMusic()
    }, [initLikedMusic])

    let myLikedMusic = musicError ? <Alert variant="danger" >Music can't be loaded!</Alert>
        : <Spinner animation="border" role="status"></Spinner>
    
    //convert obj to array
    const likedMusicConvert = []
    if (likedMusic) {
        for (let song of Object.values(likedMusic)) {
            likedMusicConvert.push(song)
        }
        myLikedMusic = <Music music={likedMusicConvert} />
    }

    return (
        <>
            <Title type="subtitle" subtitle={likedMusicConvert.length + " Songs"} >
                Liked music
            </Title>
            { myLikedMusic }
        </>
    )
}

const mapStateToProps = state => ({
    likedMusic: state.music.liked.list,
    musicError: state.music.my.error
})

const mapDispatchToProps = dispatch => ({
    initLikedMusic: () => dispatch(initLikedMusic())
})

export default connect(mapStateToProps, mapDispatchToProps)(LikedMusicPage)
