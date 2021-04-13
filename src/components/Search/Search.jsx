import React from 'react'

const Search = ({isMobile}) => {
    return (
        <div className={isMobile ? "search search--mobile" : "search"}>
            <form className="search__form">
                <div className="search__inner">
                    <input type="text" className="search__input" placeholder="Search for song"/>
                    <button className="search__btn"><i className="search__icon fas fa-search"></i></button>
                </div>
            </form>
        </div>
    )
}

export default Search
