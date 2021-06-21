import { getAuthUserData } from "./AuthReducer"

const 
    SET_SIDEBAR_STATE = 'SET_SIDEBAR_STATE',
    SET_INITIALIZE = 'SET_INITIALIZE'

const initialState = {
    sidebar: {
		isOpen: false
	},
    initialized: false
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_SIDEBAR_STATE:
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    isOpen: action.isOpen
                }
            }

        case SET_INITIALIZE:
            return { ...state, initialized: true }

        default:
            return state
    }
}

export const setSidebarState = (isOpen) => ({ type: SET_SIDEBAR_STATE, isOpen })
export const setInitializedSuccess = () => ({ type: SET_INITIALIZE })

export const initializeApp = () => dispatch => {
    dispatch(getAuthUserData())
    dispatch(setInitializedSuccess())
}
export default AppReducer
