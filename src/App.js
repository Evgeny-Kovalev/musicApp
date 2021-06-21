import React, { createContext, useEffect } from 'react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import Sidebar from './components/Sidebar/Sidebar';
import AuthForm from './components/Auth/AuthForm';
import SongPage from './components/Pages/SongPage';
import './App.scss';
import MainPage from './components/Pages/MainPage';
import LikedMusicPage from './components/Pages/LikedMusicPage';
import Audio from './components/Playbar/Audio';
import MyPlaylistsPage from './components/Pages/MyPlaylistsPage';
import PlaylistPage from './components/Pages/PlaylistPage';
import PopularPage from './components/Pages/PopularPage';
import SearchPage from './components/Pages/SearchPage';
import Header from './components/Header/Header';
import Logout from './components/Auth/Logout';
import { initializeApp } from './redux/AppReducer';
import { Spinner } from 'react-bootstrap';


export const StoreContext = createContext(null)

function App({initialized, initializeApp}) {

	useEffect(() => {
		initializeApp()
	}, [])

	if (!initialized) return <Spinner animation="border" role="status"></Spinner>
	return (
		<>
			<div className="App">
				<Sidebar  />
				<div className='wrapper'>
					<Header />
					<div className="content">
						<Switch>
							<Route path="/search/:value" >
								<SearchPage />
							</Route>
							<Route path="/popular" >
								<PopularPage />
							</Route>
							<Route path="/song/:songId">
								<SongPage />
							</Route>
							<Route path="/playlists">
								<MyPlaylistsPage />
							</Route>
							<Route path="/playlist/:playlistId">
								<PlaylistPage />
							</Route>
							<Route path="/liked">
								<LikedMusicPage />
							</Route>
							<Route path="/auth">
								<AuthForm />	
							</Route>
							<Route path="/logout">
								<Logout />	
							</Route>
							<Route path="/">
								<MainPage />
							</Route>
						</Switch>
					</div>
					<footer>
						<Audio />
					</footer>
				</div>
			</div>
		</>
	)
}

const mapStateToProps = state => ({
	initialized: state.app.initialized,
})

const mapDispatchToProps = dispatch => ({
	initializeApp: () => dispatch(initializeApp()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
