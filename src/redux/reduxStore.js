import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import AppReducer from "./AppReducer";
import AuthReducer from "./AuthReducer";
import MusicPlayerReducer from "./MusicPlayerReducer";
import thunk from "redux-thunk";
import PlaylistsReducer from "./PlaylistsReducer";
import CommentsReducer from "./CommentsReducer";
import MusicReducer from "./MusicReducer";
import AdminReducer from "./AdminReducer";
import ToastsReducer from "./ToastsReducer";

const reducers = combineReducers({
    playlists: PlaylistsReducer,
    music: MusicReducer,
    player: MusicPlayerReducer,
    auth: AuthReducer,
    comments: CommentsReducer,
    app: AppReducer,  
    admin: AdminReducer,  
    toasts: ToastsReducer,  
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
))

export default store
