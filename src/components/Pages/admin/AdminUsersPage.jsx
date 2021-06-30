import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../../../redux/AdminReducer'
import TableLayout from '../../AdminComponents/TableLayout/TableLayout'

const AdminUsersPage = ({user, users, getUsers}) => {
    
    useEffect(() => {
        getUsers(user)
    }, [])

    const dataToShow = {
        name: "Name",
        email: "Email",
        img: "Image",
    }

    const onRemoveHandler = (user) => {

    }

    const onAddHandler = (user) => {

    }
    
    return (
        <>
            <div className="row">
                <div className="col">
                    <h1 className="h2 pt-3 pb-2 mb-2">Users</h1>

                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <a className="btn btn-primary" href="#">Add</a>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TableLayout content={users} data={dataToShow} onRemove={onRemoveHandler}/>
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
    getUsers: (user) => dispatch(getUsers(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(AdminUsersPage)
