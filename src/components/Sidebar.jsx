import React from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search/Search'

const Sidebar = ({isOpen, setSidebarState}) => {

    return (
        <div className={"sidebar " + (isOpen ? "sidebar--active" : "")}>
            <span onClick={() => setSidebarState(false)} className="sidebar__close"><i className="fas fa-times"></i></span>
            <div className="profile">
                <NavLink className="profile__link" to="/">
                    <img className="profile__img" src="/img/profile.jpg" alt=""/>
                </NavLink>
                <NavLink className="profile__link" to="/">
                    <h4 className="profile__name">Farzan Faruk</h4>
                </NavLink>
                <div className="profile__email">email@email.com</div>
            </div>
            <Search isMobile={true} />
            <div className="sidebar__nav sidebar_nav">
                <ul className="sidebar_nav__list">
                    <li className="sidebar_nav__item">
                        <NavLink to="/" className="sidebar_nav__link" activeClassName="sidebar_nav__link--active">    
                            <div className="sidebar_nav__item_icon"><i className="fas fa-home"></i></div>
                            <div className="sidebar_nav__item_text">Home</div>
                        </NavLink>
                    </li>  
                    <li className="sidebar_nav__item">
                        <NavLink to="/song/1" className="sidebar_nav__link" activeClassName="sidebar_nav__link--active">    
                            <div className="sidebar_nav__item_icon"><i className="fas fa-fire"></i></div>
                            <div className="sidebar_nav__item_text">Most Popular</div>
                        </NavLink>
                    </li> 
                </ul>
                <div className="sidebar_nav__title">My Music</div>
                <ul className="sidebar_nav__list">
                    <li className="sidebar_nav__item">
                        <NavLink to="" className="sidebar_nav__link">    
                            <div className="sidebar_nav__item_icon"><i className="fas fa-compact-disc"></i></div>
                            <div className="sidebar_nav__item_text">My Playlists</div>
                        </NavLink>
                    </li>
                    <li className="sidebar_nav__item">
                        <NavLink to="" className="sidebar_nav__link">    
                            <div className="sidebar_nav__item_icon"><i className="fas fa-thumbs-up"></i></div>
                            <div className="sidebar_nav__item_text">Liked Music</div>
                        </NavLink>
                    </li>  
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
