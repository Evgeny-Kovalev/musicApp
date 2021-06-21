import React from 'react'
import { connect } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import Search from '../Search/Search'
import { setSidebarState } from '../../redux/AppReducer'
import './Header.scss'

const Header = ({setSidebarState, isAuth}) => {

    const history = useHistory()

    return (
        <header className="header">
            <div onClick={() => setSidebarState(true)} className="mobile_burger">
                <i className="fas fa-bars"></i>
            </div>
            <div className="header__back" onClick={() => history.goBack()}>
                <img className="header__back_img" src="/img/arrow-square-left.svg" alt="" />
            </div>
            <Search />
            <nav className="top_nav">
                <ul className="top_nav__list">
                    {/* <li className="top_nav__item">
                        <NavLink to="/" className="top_nav__link">
                            <i className="far fa-bell"></i>
                        </NavLink>
                    </li> */}
                    {/* <li className="top_nav__item">
                        <NavLink to="/settings/" className="top_nav__link">
                            <i className="far fa-cog"></i>
                        </NavLink>
                    </li> */}
                    <li className="top_nav__item">
                        {
                            isAuth 
                            ?
                            <NavLink to="/logout" >
                                <input className="myBtn" type="button" value="Log out"/>
                            </NavLink>
                            :
                            <NavLink to="/auth" >
                                <input className="myBtn" type="button" value="Log in"/>
                            </NavLink>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}


const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = dispatch => ({
    setSidebarState: (isOpen) => dispatch(setSidebarState(isOpen))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
