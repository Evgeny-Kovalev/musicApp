import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

export const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export const mapDispatchToProps = ({
    
})

export const withAuthRedirect = (WrappedComponent) => {
    const hocComponent = ({ ...props }) => {
        return props.isAuth
        ? <WrappedComponent {...props} />
        : <Redirect to="/auth"/>
    }

    return connect(mapStateToProps)(hocComponent)
}

export default withAuthRedirect

