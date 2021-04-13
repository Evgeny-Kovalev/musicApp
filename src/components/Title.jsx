import React from 'react'

const Title = ({type, title, subtitle, subTitleLink}) => {
    switch (type) {
        case "full":
            return (
                <div className="full_title">
                    <h3 className="title">{title}</h3>
                    <a className="subtitle" href={subTitleLink}>{subtitle}</a>
                </div>  
            )
        case "subtitle":
            return (
                <>
                    <h3 className="title">{title}</h3>
                    <div className="subtitle" href={subTitleLink}>{subtitle}</div>
                </>  
            )
    
        default:
            return (
                <h3 className="title">{title}</h3>
            )
    }

}

export default Title
