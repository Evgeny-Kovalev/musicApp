import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {useParams} from 'react-router-dom'
import { updateUser, getUser } from '../../../redux/AdminReducer'
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap'
import Title from '../../Title/Title'

const EditUserPage = ({authUser, getUser, updateUser}) => {
    const {userId} = useParams() 

    const [user, setUser] = useState()

    useEffect(() => {
        async function fetchData() {
            const user = await getUser(authUser, userId)
            setUser(user)
        } 
        fetchData()

    }, [userId])

    const imageUploadHandler = e => {
        setUser(prev => ({
            ...prev,
            imgFile: e.target.files[0],
            img: URL.createObjectURL(e.target.files[0])
        }))
    }

    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (user.name && user.email) {
            const formData = new FormData()
            formData.append('name', user.name)
            formData.append('email', user.email)
            formData.append('img', user.imgFile)
            updateUser(authUser, user, formData)
        }
    }

    
    if (!user) return <Spinner animation="border" role="status"></Spinner>
    return (
        <div>
            <Title>Edit User</Title>
            <Form onSubmit={formSubmitHandler}>
                <Row>
                    <Col>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name..."
                            value={user.name}
                            onChange={e => setUser(
                                prev => ({ ...prev, name: e.target.value })
                            )}
                        />
                    </Col>
                    <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email  ..."
                            value={user.email}
                            onChange={e => setUser(
                                prev => ({ ...prev, email: e.target.value })
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>User image</Form.Label>
                        <img width={64} height={64} className="rounded m-3" src={user.img} alt="song" />
                        <Form.Control
                            type="file"
                            placeholder="Image..."
                            onChange={imageUploadHandler}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button type="submit" variant="primary" className="mt-3" >Save</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    authUser: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    getUser: (authUser, userId) => dispatch(getUser(authUser, userId)),
    updateUser: (authUser, user, formData) => dispatch(updateUser(authUser, user, formData)),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage)
