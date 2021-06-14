import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const AuthForm = () => {
    return (
        <Form>
            <Row>
                <Col sm={12} lg={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Sign in</Button>
                </Col>
            </Row>
        </Form>
        // <form>
        //     <div className="row">
        //         <div className="col-sm-12 col-lg-6">
        //             <div className="form-group mb-3">
        //                 <label htmlFor="inputLogin">Email address</label>
        //                 <input type="email" 
        //                     className="form-control mt-2" 
        //                     id="email"
        //                     placeholder="Enter email"
        //                 />
        //             </div>
        //             <div className="form-group mb-3">
        //                 <label htmlFor="inputPassword">Password</label>
        //                 <input type="password" className="form-control mt-2" id="inputPassword" placeholder="Password"/>
        //             </div>
        //             <button type="submit" className="btn btn-primary">Sign in</button>
        //         </div>
        //     </div>
        // </form>
    )
}

export default AuthForm
