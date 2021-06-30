import React, { createContext, useEffect } from 'react'
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

import './App.scss';

import AdminPages from './components/Pages/AdminPages';
import ClientPages from './components/Pages/ClientPages';

import { initializeApp } from './redux/AppReducer';
import { Spinner } from 'react-bootstrap';


export const StoreContext = createContext(null)

function App({initialized, initializeApp}) {

	useEffect(() => {
		initializeApp()
	}, [])

	if (!initialized) return <Spinner animation="border" role="status"></Spinner>
	
	return (
		<div className="App">
			<Switch>
				<Route path="/admin" >
					<AdminPages />
				</Route>
				<Route path="/" >
					<ClientPages />
				</Route>

			</Switch>

			
		</div>
	)
}

const mapStateToProps = state => ({
	initialized: state.app.initialized,
})

const mapDispatchToProps = dispatch => ({
	initializeApp: () => dispatch(initializeApp()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
