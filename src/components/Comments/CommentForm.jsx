import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ({addComment}) => {
    const [isFormBtnsShow, setIsFormBtnsShow] = useState(false)
    const [commentText, setCommentText] = useState("")

    const formSubmitHandle = (e) => {
        e.preventDefault()
        addComment(commentText)
        setCommentText("")
    }

    return (
        <>
            <Form onSubmit={formSubmitHandle}>
                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder='Add a public comment...'
                        onFocus={() => setIsFormBtnsShow(true)}
                        onChange={e => setCommentText(e.target.value)}
                        value={commentText}
                    />
                </Form.Group>
                {
                    isFormBtnsShow &&
                    <Form.Group className="d-flex justify-content-end">
                        <Button 
                            className="mr-2"
                            variant="secondary"
                            type="submit"
                            onClick={() => setIsFormBtnsShow(false)}

                        >
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">Comment</Button>

                    </Form.Group>
                }
            </Form>
        </>
    )
}

export default CommentForm
