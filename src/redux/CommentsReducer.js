const 
    FETCH_SONG_COMMENTS_START = 'FETCH_SONG_COMMENTS_START',
    FETCH_SONG_COMMENTS_SUCCESS = 'FETCH_SONG_COMMENTS_SUCCESS',
    FETCH_SONG_COMMENTS_FAILED = 'FETCH_SONG_COMMENTS_FAILED',
    
    ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'

const initialState = {
    comments: {
        list: null,
        error: false,
        loading: false,
    },
}

const CommentsReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_SONG_COMMENTS_START:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    error: false,
                    loading: true,
                }
            }
        case FETCH_SONG_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    list: [...action.comments],
                    error: false,
                    loading: false,
                }
            }
        case FETCH_SONG_COMMENTS_FAILED:
            return {
                ...state,
                comments: {
                    ...state.comments,
                    error: true,
                    loading: false,
                }
            }
        case ADD_COMMENT_SUCCESS: 
            return {
                ...state,
                comments: {
                    ...state.comments,
                    list: [action.comment, ...state.comments.list]
                }
            }
        default:
            return state
    }
}

export const fetchSongCommentsStart = () => ({type: FETCH_SONG_COMMENTS_START})
export const fetchSongCommentsSuccess = comments => ({type: FETCH_SONG_COMMENTS_SUCCESS, comments})
export const fetchSongCommentsFailed = () => ({type: FETCH_SONG_COMMENTS_FAILED})

export const addCommentSuccess = (comment) => ({type: ADD_COMMENT_SUCCESS, comment})

export const initSongComments = (songId) => async dispatch => {
    dispatch(fetchSongCommentsStart())
    try {
        const res = await fetch(`http://localhost:3001/api/music/${songId}/comments`)
        const data = await res.json()
        if (res.status !== 200) throw Error(data.message)
        dispatch(fetchSongCommentsSuccess(data))
    }
    catch(err) {
        dispatch(fetchSongCommentsFailed())
    }
}

export const addSongComment = (userId, songId, comment) => async dispatch => {
    try {
        const res = await fetch(`http://localhost:3001/api/music/${songId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ userId, text: comment })
        })
        const data = await res.json()
        if (res.status !== 200) throw Error(data.message)
        dispatch(addCommentSuccess(data))
    }
    catch(err) {
        console.log(err)
    }
}

export default CommentsReducer

