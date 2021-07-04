import { Col, Row, Tab, ListGroup, Modal, Button, Alert, Spinner, Badge } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Title from '../../Title/Title'
import { getRoles, getUsers, removeRoleFromUser, addRoleToUser } from '../../../redux/AdminReducer'

const AdminRolesPage = ({roles, users, authUser, getRoles, getUsers, error, loading, removeRoleFromUser, addRoleToUser}) => {
    useEffect(() => {
        if (authUser?.id) {
            getRoles(authUser)
            getUsers(authUser)
        }  
    }, [])

    const [modalShow, setModalShow] = useState(false);
    const [currentRole, setCurrentRole] = useState(roles[0])
    
    if (loading) return <Spinner animation="border" role="status"></Spinner>
    if (error) return <Alert variant="danger" >Error</Alert>

    const showModalHanler = (role) => {
        setModalShow(true)
        setCurrentRole(role)
    }

    const removeRoleFromUserHandler = (role, user) => {
        const conf = window.confirm(`Are you sure?`)
        conf && removeRoleFromUser(authUser, role, user)
    }

    const addRoleToUserHandler = (role, user) => {
        addRoleToUser(authUser, role, user)
    }

    return (
        <>
        <Title>Roles & Users</Title>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        {
                            roles.map(role => 
                                <ListGroup.Item
                                    key={role._id}
                                    className="d-flex justify-content-between align-items-center"
                                    action
                                    href={`#${role.value}`}
                                >
                                    <div>
                                        {role.value}
                                        {
                                            role.users && <Badge className="ml-2" variant="primary">{role.users.length}</Badge>
                                        }
                                    </div>
                                    <i 
                                        className="fas fa-plus" 
                                        onClick={() => showModalHanler(role)}
                                        >
                                    </i>
                                </ListGroup.Item>    
                            )
                        }
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <Tab.Content>
                        {
                            roles.map(role =>
                                <Tab.Pane key={role.value} eventKey={`#${role.value}`}>
                                {
                                    role.users.map(user =>
                                        <ListGroup.Item
                                            key={user._id}
                                            className="d-flex justify-content-between align-items-center"
                                        >
                                            {user.name} - {user.email}
                                            {
                                                user._id.toString() !== authUser.id.toString() &&
                                                <i 
                                                    className="fas fa-times" 
                                                    onClick={() => removeRoleFromUserHandler(role, user)}
                                                >
                                                </i>
                                            }
                                        </ListGroup.Item>  
                                    )
                                }
                                </Tab.Pane>
                            )
                        }
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
        {
            currentRole &&
            <UsersModal
                users={users}
                onHide={() => setModalShow(false)}
                show={modalShow}
                role={currentRole}
                addUser={addRoleToUserHandler}
            />
        }
        </>
    )
}

const UsersModal = React.memo(({users, role, addUser, ...props }) => {
    const usersWithNoRole = users.filter(user => !user.roles.includes(role.value))
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add users to the {role.value} role
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Users list</h4>
                {
                    usersWithNoRole.length <= 0 
                    ? <Alert variant="info" >All users have this role</Alert>
                    :
                    <ListGroup>
                        {
                            usersWithNoRole.map(user => {
                                return <ListGroup.Item
                                    key={user._id}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    {user.name} - {user.email}
                                    <i 
                                        className="fas fa-plus" 
                                        onClick={() => addUser(role, user)}
                                    >
                                    </i>
                                </ListGroup.Item>  
                            }
                            )
                        }
                    </ListGroup>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}, (props, nextProps) => {
    return props.users === nextProps.users &&
        props.show === nextProps.show &&
        props.role === nextProps.role
})

const mapStateToProps = state => ({
    roles: state.admin.roles,
    users: state.admin.users,
    error: state.admin.error,
    loading: state.admin.loading,
    authUser: state.auth.user,

})

const mapDispatchToProps = dispatch => ({
    getRoles: (user) => dispatch(getRoles(user)),
    getUsers: (user) => dispatch(getUsers(user)),
    removeRoleFromUser: (authUseruser, role, user) => dispatch(removeRoleFromUser(authUseruser, role, user)),
    addRoleToUser: (authUser, role, user) => dispatch(addRoleToUser(authUser, role, user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminRolesPage)
