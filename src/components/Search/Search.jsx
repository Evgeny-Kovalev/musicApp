import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { searchMusic, setSearchValue } from '../../redux/MusicReducer'
import './Search.scss'

const Search = ({isMobile, searchMusic, setSearchValue, searchValue}) => {

    const history = useHistory()
    const {value} = useParams()

    useEffect(() => {
        value && setSearchValue(value)
    }, [setSearchValue, value])

    const searchChangeHandle = (e) => {
        setSearchValue(e.target.value)
        searchMusic()
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
                        onChange={searchChangeHandle}
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

const mapStateToProps = state => ({
    searchValue: state.music.search.value,
})

const mapDispatchToProps = dispatch => ({
    searchMusic: (songName) => dispatch(searchMusic(songName)),
    setSearchValue: (songName) => dispatch(setSearchValue(songName))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
