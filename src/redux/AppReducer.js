const SET_SIDEBAR_STATE = 'SET_SIDEBAR_STATE'

const initialState = {
    sidebar: {
		isOpen: false
	}
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

        default:
            return state
    }
}

export const setSidebarState = (isOpen) => {
    return {
        type: SET_SIDEBAR_STATE,
        isOpen
    }
}

export default AppReducer
