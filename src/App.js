import './App.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Playlists from './components/Playlists/Playlists';
import Title from './components/Title';
import Music from './components/Music/Music';
import { Route, Switch } from 'react-router';
import MusicCard from './components/MusicCard/MusicCard';
import initialState from './initialState'

import React, { useState } from 'react'
import usePlayer from './hooks/usePlayer';


function App() {

	const [state, setState] = useState(initialState)

	const player = usePlayer(state.music)

	const setSidebarState = (val) => {
		setState(prevState => ({
			...prevState,
			sidebar: {...prevState.sidebar, open: val}
		}))
	}

	return (
		<div className="App">
			<Sidebar isOpen={state.sidebar.open} setSidebarState={setSidebarState} />
			<div className="wrapper">
				<Header setSidebarState={setSidebarState} />
				<div className="content">
					<Switch>
						<Route path="/song/:songId">
							<MusicCard 
								content={state.music}
								/>
						</Route>
						<Route path="/playlist/:playlistId">
							<MusicCard
								isPlaylist={true}
								content={state.playlists}
							/>
						</Route>
						<Route path="/">
							<Title type="full" title="My Last Playlists" subtitle="View All" subTitleLink="playlists/"/>
							<Playlists playlists={state.playlists} />
							<Music 
								music={state.music} 
								playSong={player.playSong} 
								isPlaying={player.isPlaying}
								activeTrack={player.activeTrack}
							/>
						</Route>
					</Switch>
				</div>
				<footer>
					<Player player={player} />
				</footer>
			</div>
		</div>
	)
}

export default App;
