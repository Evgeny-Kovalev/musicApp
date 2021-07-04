import React  from 'react'
import { Toast } from 'react-bootstrap'
import { connect } from 'react-redux';
import {removeToast} from '../../redux/ToastsReducer';
import './Toasts.scss'

const Toasts = ({toasts, removeToast}) => {

    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            className="myToasts"
        >
            <div className="myToasts__wrapper">
                {
                    toasts.map(toast =>
                        <Toast
                            key={toast.id}
                            className="myToast"
                            style={{backgroundColor: toast.color}}
                            onClose={() => removeToast(toast)}
                            delay={3000}
                            show
                            autohide
                        >
                            <Toast.Header>
                                <strong className="mr-auto">{toast.title}</strong>
                            </Toast.Header>
                            <Toast.Body>{toast.text}</Toast.Body>
                        </Toast>
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    toasts: state.toasts.list
})

const mapDispatchToProps = dispatch => ({
    removeToast: toast => dispatch(removeToast(toast)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Toasts)
