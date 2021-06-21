import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Search.scss'

const Search = ({isMobile}) => {

    const history = useHistory()
    const [searchValue, setSearchValue] = useState("")

    const searchValueChangeHandle = (e) => {
        setSearchValue(e.target.value)
        history.push(`/search/${e.target.value}`)
    }
    const formSubmitHandle = (e) => {
        e.preventDefault()
        history.push(`/search/${searchValue}`)
    }

    return (
        <div className={isMobile ? "search search--mobile" : "search"}>
            <form className="search__form" onSubmit={formSubmitHandle}>
                <div className="search__inner">
                    <input
                        type="text"
                        className="search__input"
                        placeholder="Some song title..."
                        onChange={searchValueChangeHandle}
                        value={searchValue || ""}
                    />
                    <button className="search__btn"><i className="search__icon fas fa-search"></i></button>
                </div>
            </form>
            {/* <div className="search__list search__list--active">
                <Music music={searchedMusic}/>
            </div> */}
        </div>
    )
}

export default Search
