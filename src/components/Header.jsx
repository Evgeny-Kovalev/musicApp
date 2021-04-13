import React from 'react'
import Search from './Search/Search'

const Header = ({setSidebarState}) => {
    return (
        <header className="header">
            <div onClick={() => setSidebarState(true)} className="mobile_burger">
                <i className="fas fa-bars"></i>
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
                        <input className="myBtn" type="button" value="Sing In"/>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
