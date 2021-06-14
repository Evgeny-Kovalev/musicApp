import React from 'react'
import { NavLink } from 'react-router-dom'
import './Title.scss'

const Title = ({type, children, subtitle, to}) => {
    switch (type) {
        case "full":
            return (
                <div className="full_title">
                    <h3 className="title">{children}</h3>
                    <NavLink className="subtitle" to={to} >{subtitle}</NavLink>
                </div>  
            )
        case "subtitle":
            return (
                <>
                    <h3 className="title">{children}</h3>
                    <div className="subtitle">{subtitle}</div>
                </>  
            )
    
        default:
            return (
                <h3 className="title">{children}</h3>
            )
    }

}

export default Title
