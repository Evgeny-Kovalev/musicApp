import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setSidebarState } from '../../redux/AppReducer'
import Search from '../Search/Search'
import './Sidebar.scss'

const Sidebar = ({isOpen, setSidebarState, isAuth, authUser, items}) => {

    const sidebarItems = items.map(item => {
        if (item.type === 'item') {
            return (
                <li className="sidebar_nav__item" key={item.title}>
                    <NavLink
                        exact
                        to={item.path}
                        className="sidebar_nav__link"
                        activeClassName="sidebar_nav__link--active"
                        onClick={() => setSidebarState(false)}
                    >    
                        <div className="sidebar_nav__item_icon">{item.icon}</div>
                        <div className="sidebar_nav__item_text">{item.title}</div>
                    </NavLink>
                </li>        
            )
        }
        if (item.type === 'title') {
            return (
                <li className="sidebar_nav__item--title" key={item.title}>
                    {item.title}
                </li>
            )
        }
    })

    return (
        <div className={"sidebar " + (isOpen ? "sidebar--active" : "")}>
            <span onClick={() => setSidebarState(false)} className="sidebar__close"><i className="fas fa-times"></i></span>
            
            {
            isAuth 
            ?
                <div className="profile">
                    <NavLink className="profile__link" to="/">
                        <img className="profile__img" src="/img/profile.jpg" alt=""/>
                    </NavLink>
                    {/* <NavLink className="profile__link" to="/"> */}
                        <h4 className="profile__name">{authUser.name}</h4>
                    {/* </NavLink> */}
                    <div className="profile__email">{authUser.email}</div>
                </div>
            :
                <div className="logo">
                    <NavLink className="logo__link" to="/">
                        <img src="/img/React-icon.svg" alt="" className="logo__img" />
                        <h3 className="logo__title">Music App</h3>
                    </NavLink>
                </div>
            }
            <Search isMobile={true} />
            <div className="sidebar__nav sidebar_nav">
                <ul className="sidebar_nav__list">
                    {sidebarItems}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isOpen: state.app.sidebar.isOpen,
    isAuth: state.auth.isAuth,
    authUser: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    setSidebarState: (isOpen) => {
        dispatch(setSidebarState(isOpen))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
