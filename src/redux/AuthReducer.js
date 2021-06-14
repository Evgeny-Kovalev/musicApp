const 
    AUTH_START = 'AUTH_START',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAIL = 'AUTH_FAIL'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {

        case AUTH_START:
            return {
                ...state,
            }

        case AUTH_SUCCESS:
            return {
                ...state,
            }

        case AUTH_FAIL:
            return {
                ...state,
            }

        default:
            return state
    }
}

// export const setAuthUserData = (userId, email, login, isAuth) => ({
//     type: SET_USER_DATA,
//     data: {userId, email, login, isAuth}
// })


export const authStart = () => ({ type: AUTH_START })
export const authSuccess = (data) => ({ type: AUTH_START,data })
export const authFail = (error) => ({ type: AUTH_FAIL, error})


export const auth = (email, password) => dispatch => {
    dispatch(authStart())
    const key = "AIzaSyAHDO9BBoKOhKmjwt10H3svpcel2qE96rQ"
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${key}`
    const body =  {
        email, password, returnSecureToken: true
    }
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        // dispatch(authSuccess(data))
    })
    .catch(err => {
        console.log(err)
        // dispatch(authFail(err))
    })
}


export default AuthReducer
