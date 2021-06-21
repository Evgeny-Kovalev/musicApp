import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../../redux/AuthReducer'

const Logout = ({logout}) => {

    useEffect(() => {
        logout()
    }, [])

    return (
        <Redirect to="/" />
    )
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()) 
})


export default connect(mapStateToProps, mapDispatchToProps)(Logout)
