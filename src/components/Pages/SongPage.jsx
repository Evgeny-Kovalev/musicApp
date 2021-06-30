import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'
import { addSongToMyMusic, initMyMusic, initSong, removeSongFromMyMusic } from '../../redux/MusicReducer'
import { addSongComment } from '../../redux/CommentsReducer'
import Comments from '../Comments/Comments'
import CommentForm from '../Comments/CommentForm'
import MusicCard from '../MusicCard/MusicCard'
import Title from '../Title/Title'
import { initSongComments } from '../../redux/CommentsReducer'

const SongPage = ({currentSong, initSong, isAuth, initSongComments, initMyMusic, songComments, myMusic, addSongToMyMusic, removeSongFromMyMusic, user, addSongComment}) => {

    const {songId} = useParams()

    useEffect(() => {
        user?.id && initMyMusic(user)
        if (songId) {
            initSong(songId)
            initSongComments(songId)
        }
    }, [initSongComments, initSong, songId])

    const isMySong = myMusic && myMusic.some(mySong => mySong._id.toString() === songId.toString())

    const deleteSongHandle = (song) => {
        if (user?.id) {
            removeSongFromMyMusic(user, song)
        }
    }
    const addToMyMusicHandle = (song) => {
        if (user?.id) {
            addSongToMyMusic(user, song)
        }
    }

    const commentSubmitHandler = comment => {
        if (user?.id) {
            addSongComment(user, songId, comment)
        }
    }

    return (
        <>
        {
            currentSong &&
            <MusicCard
                id={songId}
                content={currentSong}
                isMy={isMySong}
                addToMyMusic={addToMyMusicHandle}
                deleteFromMyMusic={deleteSongHandle}
            />
        }
            {
                isAuth &&
                <>
                    <Title>New comment</Title>
                    <CommentForm addComment={commentSubmitHandler} />
                </>
            }
            <Title>Comments</Title>
            {
                songComments     
                ? <Comments comments={songComments} />
                : null
            }
        </>
    )
}

const mapStateToProps = state => ({
    currentSong: state.music.currentSong,
    myMusic: state.music.my.list,
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    songComments: state.comments.comments.list
})

const mapDispatchToProps = dispatch => ({
    initSong: (songId) => dispatch(initSong(songId)),
    initSongComments: (songId) => dispatch(initSongComments(songId)),
    initMyMusic: (userId) => dispatch(initMyMusic(userId)),
    removeSongFromMyMusic: (user, song) => dispatch(removeSongFromMyMusic(user, song)),
    addSongToMyMusic: (user, song) => dispatch(addSongToMyMusic(user, song)),
    addSongComment: (user, song, comment) => dispatch(addSongComment(user, song, comment)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SongPage)
