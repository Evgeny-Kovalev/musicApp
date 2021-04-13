import React from 'react'

const CircleBtn = ({type, isActive = false, className, onClick}) => {
    const types = [
        {type: "add", iconClass: "fas fa-plus"},
        {type: "like", iconClass: "fas fa-heart"},
        {type: "close", iconClass: "fas fa-times"},
    ]

    let currentType = types.find(item => item.type === type) || types[0]

    return (
        <div className={"circle_item " + className} onClick={(e) => onClick(e)}>
            <div className={"circle_item__link " + (isActive ? "circle_item__link--active" : "")}>
                <i className={currentType.iconClass}></i>
            </div>
        </div>
    )
}

export default CircleBtn
