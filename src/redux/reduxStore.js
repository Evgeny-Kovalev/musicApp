import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import AppReducer from "./AppReducer";
import AuthReducer from "./AuthReducer";
import MusicPlayerReducer from "./MusicPlayerReducer";
import thunk from "redux-thunk";
import PlaylistsReducer from "./PlaylistsReducer";
import MusicReducer from "./MusicReducer";

const reducers = combineReducers({
    playlists: PlaylistsReducer,
    music: MusicReducer,
    player: MusicPlayerReducer,
    auth: AuthReducer,
    app: AppReducer,  
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
))

export default store
