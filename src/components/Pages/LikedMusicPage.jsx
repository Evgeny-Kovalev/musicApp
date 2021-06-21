import React, { useEffect } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { initLikedMusic } from '../../redux/MusicReducer'
import withAuthRedirect from '../hoc/withAuthRedirect'
import Music from '../Music/Music'
import Title from '../Title/Title'

const LikedMusicPage = ({likedMusic, initLikedMusic, musicError, user}) => {

    useEffect(() => {
        user?.id && initLikedMusic(user.id)
    }, [initLikedMusic])

    let myLikedMusic = musicError ? <Alert variant="danger" >Music can't be loaded!</Alert>
        : <Spinner animation="border" role="status"></Spinner>
    
    if (likedMusic) myLikedMusic = <Music music={likedMusic} />
    

    return (
        <>
            <Title type="subtitle" subtitle={`${likedMusic?.length || "0"} Songs`} >
                Liked music
            </Title>
            { myLikedMusic }
        </>
    )
}

const mapStateToProps = state => ({
    likedMusic: state.music.liked.list,
    musicError: state.music.my.error,
    user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
    initLikedMusic: (userId) => dispatch(initLikedMusic(userId))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(LikedMusicPage)