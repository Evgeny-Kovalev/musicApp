import React, { createContext, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import Sidebar from './components/Sidebar/Sidebar';
import AuthForm from './components/AuthForm';
import SongPage from './components/Pages/SongPage';
import './App.scss';
import MainPage from './components/Pages/MainPage';
import LikedMusicPage from './components/Pages/LikedMusicPage';
import { setCurrentTime, setDuration, setVolume } from './redux/MusicPlayerReducer';
import Playbar from './components/Playbar/Playbar';
import MyPlaylistsPage from './components/Pages/MyPlaylistsPage';
import PlaylistPage from './components/Pages/PlaylistPage';
import PopularPage from './components/Pages/PopularPage';
import SearchPage from './components/Pages/SearchPage';
import Header from './components/Header/Header';

export const StoreContext = createContext(null)

function App({state, setDuration, setCurrentTime}) {

	const audioRef = useRef()

	useEffect(() => {
		async function asyncFun()  {
			if (state.playing) {
				// await audioRef.current.load()
				await audioRef.current.play()
			}
			else 
				await audioRef.current.pause()
		}
		asyncFun()
	}, [state.playing, state.currentSongId])

	useEffect(() => {
		audioRef.current.volume = state.volume
	}, [state.volume])



	return (
		<>
			<div className="App">
				<Sidebar  />
				<div className={`wrapper${state.currentSong ? " wrapper--player" : ""}`}>
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
							<Route path="/">
								<MainPage />
							</Route>
						</Switch>
					</div>
					<footer>
						{state.currentSong && <Playbar audioRef={audioRef} />}
					</footer>
				</div>
			</div>
			<audio
				loop
				ref={audioRef}
				src={
					state.currentSongId
					? `http://localhost:3001/files/music/${state.currentSongId}.mp3`
					: ''
				}
				onLoadedMetadata={() => setDuration(audioRef.current.duration)}
				onTimeUpdate={e => setCurrentTime(e.target.currentTime)}
			/>
		</>
	)
}

const mapStateToProps = state => ({
	// music: state.music.myMusic,
	state: state.player
})

const mapDispatchToProps = dispatch => ({
	setDuration: duration => dispatch(setDuration(duration)),
	setCurrentTime: time => dispatch(setCurrentTime(time)),
	setVolume: volume => dispatch(setVolume(volume))
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
