import React from 'react'
import { useState } from 'react'
import { Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login, signup } from '../../redux/AuthReducer'
import Title from '../Title/Title'

const AuthForm = ({signup, login, isAuth, error, loading}) => {

    const [isSignup, setIsSignup] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const formSubmitHandle = (e) => {
        e.preventDefault()
        e.stopPropagation()

        isSignup ? signup(email, password, name) : login(email, password)
    }

    if (isAuth) return <Redirect to="/" />
    if (loading) return <Spinner animation="border" role="status"></Spinner>

    return (
        <>
            <Title>{isSignup ? "Sign up" : "Log in"}</Title>
            {
                error && <Alert variant="danger" >{error}</Alert>
            }
            
            <Form onSubmit={formSubmitHandle}>
                <Row>
                    <Col sm={12} lg={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password" 
                                placeholder="Enter password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </Form.Group>
                        {
                            isSignup &&
                            <Form.Group className="mb-3">
                                <Form.Label>Your name</Form.Label>
                                <Form.Control
                                    type="text" 
                                    placeholder="Enter name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                        }
                        <div className="d-flex justify-content-between">
                            <Button variant="primary" type="submit">
                                {isSignup ? "Sign up" : "Log in"}
                            </Button>
                            
                            <Button variant="outline-primary" onClick={() => setIsSignup(!isSignup)} >
                                {isSignup ? "Log in" : "Sign up"}
                            </Button>
                        </div>

                    </Col>
                </Row>
            </Form>
        </>
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    error: state.auth.error,
    loading: state.auth.loading,
})

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(login(email, password)),
    signup: (email, password, name) => dispatch(signup(email, password, name)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)
