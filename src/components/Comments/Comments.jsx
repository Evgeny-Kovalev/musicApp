import React from 'react'
import CommentsItem from './CommentsItem'
import './Comments.scss'

const Comments = ({comments}) => {
    return (
        <ul className="list-unstyled">
        {
            comments.map(comment => 
                <CommentsItem
                    key={"c-"+comment._id}
                    comment={comment}
                />
            )
        }
        </ul>
    )
}

export default Comments
