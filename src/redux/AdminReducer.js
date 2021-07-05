import { musicAPI, rolesAPI, usersAPI } from "../components/api/api"
import {addToastError, addToastSuccess} from "./ToastsReducer";

const 
    ADD_NEW_MUSIC_SUCCESS = 'ADD_NEW_MUSIC_SUCCESS',
    REMOVE_SONG_SUCCESS = 'REMOVE_SONG_SUCCESS',

    ADD_NEW_USER_SUCCESS = 'ADD_NEW_USER_SUCCESS',
    REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS',

    SET_USERS = 'SET_USERS',
    SET_ROLES = 'SET_ROLES',
    SET_MUSIC = 'SET_MUSIC',

    SET_SUCCESS = 'SET_SUCCESS',
    SET_ERROR = 'SET_ERROR',
    SET_LOADING = 'SET_LOADING',

    ADD_ROLE_TO_USER_SUCCESS = 'ADD_ROLE_TO_USER_SUCCESS',
    REMOVE_ROLE_FROM_USER_SUCCESS = 'REMOVE_ROLE_FROM_USER_SUCCESS'

const initialState = {
    users: [],
    music: [],
    roles: [],
    loading: false,
    error: false
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_MUSIC:
            return {
                ...state,
                music: action.music
            }
        case SET_ROLES:
            return {
                ...state,
                roles: action.roles
            }
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }
        case SET_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false
            }
        case ADD_NEW_MUSIC_SUCCESS:
            return {
                ...state,
                music: [action.music, ...state.music]
            }
        case REMOVE_SONG_SUCCESS:
            return {
                ...state,
                music: state.music.filter(song => song._id !== action.song._id)
            }

        case ADD_NEW_USER_SUCCESS:
            return {
                ...state,
                users: [action.user, ...state.users]
            }
        case REMOVE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.user._id)
            }

        case ADD_ROLE_TO_USER_SUCCESS: {
            const currentRoleIndex = state.roles.findIndex(role => role._id.toString() === action.role._id.toString())
            const roles = [...state.roles]
            roles[currentRoleIndex] = {...roles[currentRoleIndex]}
            roles[currentRoleIndex].users = roles[currentRoleIndex].users.filter(user => 
                user._id.toString() !== action.user._id.toString()
            )
            roles[currentRoleIndex].users.push(action.user)

            const users = [...state.users]
            const currentUserIndex = users.findIndex(user => user._id.toString() === action.user._id.toString())
            users[currentUserIndex].roles = [...users[currentUserIndex].roles, action.role.value]
            
            return { ...state, roles, users }
        }
        case REMOVE_ROLE_FROM_USER_SUCCESS: {
            const currentRoleIndex = state.roles.findIndex(role => role._id.toString() === action.role._id.toString())
            const roles = [...state.roles]
            roles[currentRoleIndex] = {...roles[currentRoleIndex]}
            roles[currentRoleIndex].users = roles[currentRoleIndex].users.filter(user => 
                user._id.toString() !== action.user._id.toString()
            )

            const users = [...state.users]
            const currentUserIndex = users.findIndex(user => user._id.toString() === action.user._id.toString())
            users[currentUserIndex].roles = users[currentUserIndex].roles.filter(role => role !== action.role.value)
            
            return { ...state, roles, users }
        }

        default:
            return state
    }
}

export const setLoading = () => ({ type: SET_LOADING })
export const setError = () => ({ type: SET_ERROR })
export const setSuccess = () => ({ type: SET_SUCCESS })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setMusic = (music) => ({ type: SET_MUSIC, music })
export const addNewMusicSuccess = (music) => ({ type: ADD_NEW_MUSIC_SUCCESS, music })
export const removeSongSuccess = (song) => ({ type: REMOVE_SONG_SUCCESS, song })

export const getUsers = (user) => async dispatch => {
    try {
        dispatch(setLoading())
        const [res, data] = await usersAPI.getUsers(user)
        if (res.status !== 200) throw new Error(data.message)
        dispatch(setUsers(data))
        dispatch(setSuccess())
    }
    catch(err) {
        console.log(err)
        dispatch(setError(err))
    }
}

export const getMusic = (user) => async dispatch => {
    try {
        dispatch(setLoading())
        const [res, data] = await musicAPI.getMusic(user)
        if (res.status !== 200) throw Error(data.message)
        dispatch(setMusic(data))
        dispatch(setSuccess())
    }
    catch(err) {
        console.log(err)
        dispatch(setError(err))
    }
}

export const addNewMusic = (user, formData) => async dispatch => {
    try {
        // dispatch(setLoading())
        const [res, data] = await musicAPI.addNewMusic(user, formData)
        if (res.status !== 200) throw Error(data.message)
        dispatch(addNewMusicSuccess(data))
        dispatch(addToastSuccess({ text: 'Song added successfully' }))
    }
    catch(err) {
        console.log(err)
        dispatch(addToastError({ text: 'Failed to add song' }))
        // dispatch(setError(err))
    }
}
export const removeSong = (user, song) => async dispatch => {
    try {
        const [res, data] = await musicAPI.removeSong(user, song)
        if (res.status !== 200) throw Error(data.message)
        dispatch(removeSongSuccess(song))
        dispatch(addToastSuccess({ text: 'Song removed successfully' }))
    }
    catch(err) {
        console.log(err)
        dispatch(addToastError({ text: 'Failed to remove the song' }))
    }
}

export const updateSong = (user, song, formData) => async dispatch => {
    try {
        const [res, data] = await musicAPI.updateSong(user, song, formData)
        if (res.status !== 200) throw Error(data.message)
        dispatch(addToastSuccess({ text: "Song updated" }))
    }
    catch(err) {
        dispatch(addToastError({ text: 'Failed to update the song' }))
        console.log(err)
    }
}

export const getRoles = (user) => async dispatch => {
    dispatch(setLoading())
    try {
        const [res, data] = await rolesAPI.getRoles(user)
        if (res.status !== 200) throw new Error(data.message)
        dispatch({type: SET_ROLES, roles: data})
        dispatch(setSuccess())
    }
    catch(err) {
        console.log(err)
        dispatch(setError(err))
    }
}

export const removeRoleFromUser = (authUser, role, user) => async dispatch => {
    try {
        const [res, data] = await rolesAPI.removeRoleFromUser(authUser, role, user)
        if (res.status !== 200) throw new Error(data.message)
        dispatch({type: REMOVE_ROLE_FROM_USER_SUCCESS, role, user})
        dispatch(addToastSuccess({ text: `Role ${role.value} removed from user ${user.name}`}))
    }
    catch(err) {
        dispatch(addToastError({ text: 'Remove role failed' }))
        console.log(err)
    }
}

export const addRoleToUser = (authUser, role, user) => async dispatch => {
    try {
        const [res, data] = await rolesAPI.addRoleToUser(authUser, role, user)
        if (res.status !== 200) throw new Error(data.message)
        dispatch({type: ADD_ROLE_TO_USER_SUCCESS, role, user})
        dispatch(addToastSuccess({ text: `Role ${role.value} add to user ${user.name}`}))
    }
    catch(err) {
        dispatch(addToastError({ text: 'Role could not be added' }))
        console.log(err)
    }
}

export const getUser = (authUser, userId) => async dispatch => {
    try {
        const [res, data] = await usersAPI.getUserById(authUser, userId)
        if (res.status !== 200) throw Error(data.message)
        return data
    }
    catch(err) {
        dispatch(addToastError({ text: 'Failed to load user' }))
        console.log(err)
    }
}

export const removeUser = (authUser, user) => async dispatch => {
    try {
        const [res, data] = await usersAPI.removeUser(authUser, user)
        if (res.status !== 200) throw new Error(data.message)
        dispatch({type: REMOVE_USER_SUCCESS, user})
        dispatch(addToastSuccess({ text: `User '${user.name}' removed successfully`}))
    }
    catch(err) {
        dispatch(addToastError({ text: 'Remove user failed' }))
        console.log(err)
    }
}

export const updateUser = (authUser, user, formData) => async dispatch => {
    try {
        const [res, data] = await usersAPI.updateUser(authUser, user, formData)
        if (res.status !== 200) throw new Error(data.message)
        dispatch(addToastSuccess({ text: `User updated successfully`}))
    }
    catch(err) {
        dispatch(addToastError({ text: 'Update user failed' }))
        console.log(err)
    }
}

export const addNewUser = (authUser, formData) => async dispatch => {
    try {
        const [res, data] = await usersAPI.addNewUser(authUser, formData)
        if (res.status !== 200) throw new Error(data.message)
        dispatch({type: ADD_NEW_USER_SUCCESS, user: data.user})
        dispatch(addToastSuccess({ text: `User '${data.user.name}' added successfully`}))
    }
    catch(err) {
        dispatch(addToastError({ text: 'Add user failed' }))
        console.log(err)
    }
}


export default AppReducer
