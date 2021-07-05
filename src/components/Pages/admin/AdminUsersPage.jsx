import { Row, Col, Form } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addNewUser, getUsers, removeUser } from '../../../redux/AdminReducer'
import TableLayout from '../../AdminComponents/TableLayout/TableLayout'
import { useHistory } from 'react-router-dom'

const AdminUsersPage = ({user, users, getUsers, addNewUser, removeUser}) => {
    
    useEffect(() => {
        getUsers(user)
    }, [])

    const history = useHistory()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userImage, setUserImage] = useState()

    const [showAddForm, setShowAddForm] = useState(false)

    const dataToShow = {
        name: "Name",
        email: "Email",
        img: "Image",
    }

    const removeHandler = (removedUser) => {
        const conf = window.confirm(`Are you sure?`)
        conf && removeUser(user, removedUser)
    }

    const addHandler = (e) => {
        e.preventDefault()
        if (showAddForm && name && email) {
            const formData = new FormData()
            formData.append('img', userImage)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            addNewUser(user, formData)
            setName("")
            setEmail("")
        }
        else setShowAddForm(true)
    }

    const editUserHandler = (user) => {
        history.push(`/admin/users/edit/${user._id}`)
    }
    
    return (
        <>
            <div className="row">
                <div className="col">
                    <h1 className="h2 pt-3 pb-2 mb-2">Users</h1>

                </div>
            </div>
            <Form onSubmit={addHandler} >
            { showAddForm &&
            <>
                <Row className="g-2">
                    <Col md>
                        <Form.Group className="mb-3" >
                            <Form.Label>User name</Form.Label>
                            <Form.Control
                                name="name"
                                type="text"
                                placeholder="Name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                name="email"
                                type="email"
                                placeholder="Email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="g-2">
                    <Col md>
                        <Form.Group className="mb-3" >
                            <Form.Label>Choose user <b>image</b></Form.Label>
                            <Form.Control
                                name="image"
                                type="file"
                                onChange={(e) => setUserImage(e.target.files[0])}
                            />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                name="password"
                                type="password"
                                placeholder="Password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </>
            }
            <Row className="mb-3" >
                <Col md>
                    <button className="btn btn-primary mr-3" type="submit">
                        Add New
                    </button>
                    {
                    showAddForm &&
                    <button className="btn btn-secondary" onClick={() => setShowAddForm(false)} >
                        Close
                    </button>
                    }
                </Col>
            </Row>
        </Form>
            <div className="row">
                <div className="col">
                    <TableLayout content={users} data={dataToShow} onRemove={removeHandler} onEdit={editUserHandler} />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    users: state.admin.users,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    getUsers: (user) => dispatch(getUsers(user)),
    addNewUser: (authUser, user) => dispatch(addNewUser(authUser, user)),
    removeUser: (authUser, user) => dispatch(removeUser(authUser, user)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AdminUsersPage)
