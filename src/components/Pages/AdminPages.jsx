import React from 'react'
import AdminUsersPage from '../Pages/admin/AdminUsersPage'
import AdminMusicPage from '../Pages/admin/AdminMusicPage'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import { Switch, Route } from 'react-router-dom'
import withAuthRedirect from '../hoc/withAuthRedirect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import AdminRolesPage from './admin/AdminRolesPage'

const AdminPages = ({user, isAuth}) => {

    if (!isAuth) 
        return <Alert variant="info" >Please <Alert.Link href="/auth" >login</Alert.Link></Alert>
    if (!user?.roles.includes("ADMIN")) 
        return <Alert variant="info" >You don't have access. <Alert.Link href="/">Home</Alert.Link></Alert>

    const adminSidebarItems = [
        {
            type: "item",
            title: 'Go home',
            path: '/',
            icon: <i className="fas fa-home"></i>
        },
        {
            type: "title",
            title: 'ADMIN PANEL',
        },
        {
            type: "item",
            title: 'Music',
            path: '/admin/music',
            icon: <i className="fas fa-music"></i>
        },
        {
            type: "item",
            title: 'Users',
            path: '/admin/users',
            icon: <i className="fas fa-user"></i>
        },
        {
            type: "item",
            title: 'Roles',
            path: '/admin/roles',
            icon: <i className="fas fa-tags"></i>
        },
    ]

    return (
        <>
        <Sidebar items={adminSidebarItems} />
        <div className='wrapper'>
            <Header />
            <div className="content">
                <Switch>
                    <Route path="/admin/music" >
                        <AdminMusicPage />
                    </Route>
                    <Route path="/admin/roles" >
                        <AdminRolesPage content={1} />
                    </Route>
                    <Route path="/admin/users" >
                        <AdminUsersPage />
                    </Route>
                </Switch>
            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = dispatch => ({

})


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(AdminPages)
