import React from 'react'
import {Media} from 'react-bootstrap'

const CommentsItem = ({comment}) => {
    return (
        <Media as="li" className="mb-3">
            <img
                width={50}
                height={50}
                className="mr-3 comment__img"
                src={comment.user.img}
                alt="User"
            />
            <Media.Body>
                <h5>{comment.user.name}</h5>
                <p>
                    {comment.text}
                </p>
            </Media.Body>
        </Media>
    )
}

export default CommentsItem
