import { authAPI } from "../components/api/api"

const 
    AUTH_START = 'AUTH_START',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAILED = 'AUTH_FAILED',
    AUTH_LOGOUT = 'AUTH_LOGOUT'

const initialState = {
    user: null,
    token: null,
    isAuth: false,
    error: false,
    loading: false,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {

        case AUTH_START:
            return {
                ...state,
                loading: true,
                error: false,
                isAuth: false,
            }

        case AUTH_SUCCESS:
            console.log(action)
            return {
                ...state,
                user: {
                    ...state.user,
                    id: action.data.user.id,
                    email: action.data.user.email,
                    name: action.data.user.name,
                },
                token: action.data.token,
                isAuth: true,
                loading: false,
                error: false,
            }

        case AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error || "Error",
                isAuth: false,
            }

        case AUTH_LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuth: false,
            }

        default:
            return state
    }
}

export const authStart = () => ({ type: AUTH_START })
export const authSuccess = (data) => ({ type: AUTH_SUCCESS, data })
export const authFailed = (error) => ({ type: AUTH_FAILED, error})
export const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return { type: AUTH_LOGOUT }
}

export const login = (email, password) => async dispatch => {
    dispatch(authStart())

    try {
        const [res, data] = await authAPI.login(email, password)
        if (res.status !== 200) throw Error(data.message)

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        dispatch(authSuccess(data))
    }
    catch(err) {
        dispatch(authFailed(err))
        console.log(err)
    }
}

export const signup = (email, password, name) => async dispatch => {
    dispatch(authStart())

    try {
        const [res, data] = await authAPI.signup(email, password, name)
        if (res.status !== 200) throw Error(data.message)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        dispatch(authSuccess(data))
    }
    catch(err) {
        dispatch(authFailed(err))
        console.log(err)
    }
}

export const getAuthUserData = () => dispatch => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) dispatch(authSuccess({ user: JSON.parse(user), token }))
}

export default AuthReducer
