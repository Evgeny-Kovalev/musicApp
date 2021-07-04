const 
    ADD_TOAST = 'ADD_TOAST',
    REMOVE_TOAST = 'REMOVE_TOAST'

const initialState = {
    list: []
}

const ToastsReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_TOAST: 
            const {title, text, color} = action.options
            const newToast = { id: Date.now(), title, text, color: color || '' }

            return {
                ...state,
                list: [newToast, ...state.list]
            }
        
        case REMOVE_TOAST:
            return {
                ...state,
                list: state.list.filter(toast => toast.id !== action.toast.id)
            }

        default:
            return state
    }
}

export const removeToast = (toast) => ({ type: REMOVE_TOAST, toast })
export const addToast = (options) => ({ type: ADD_TOAST, options })

export const addToastSuccess = (options) => addToast({...options, title: 'Success', color: '#d4edda' })
export const addToastError = (options) => addToast({...options, title: 'Error', color: '#f8d7da' })

export default ToastsReducer
