import React from 'react'
import SearchPage from "./SearchPage";
import PopularPage from "./PopularPage";
import SongPage from "./SongPage";
import MyPlaylistsPage from "./MyPlaylistsPage";
import PlaylistPage from "./PlaylistPage";
import LikedMusicPage from "./LikedMusicPage";
import AuthForm from "../Auth/AuthForm";
import Logout from "../Auth/Logout";
import MainPage from "./MainPage";
import Audio from "../Playbar/Audio";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import {Route, Switch} from "react-router-dom";

const ClientPages = () => {
    const clientSidebarItems = [
        {
            type: "item",
            title: 'Home',
            path: '/',
            icon: <i className="fas fa-home"></i>
        },
        {
            type: "item",
            title: 'Most popular',
            path: '/popular',
            icon: <i className="fas fa-fire"></i>
        },
        {
            type: "title",
            title: 'my music',
        },
        {
            type: "item",
            title: 'My playlists',
            path: '/playlists',
            icon: <i className="fas fa-compact-disc"></i>
        },
        {
            type: "item",
            title: 'Liked music',
            path: '/liked',
            icon: <i className="fas fa-thumbs-up"></i>
        },
    ]
    return (
        <>
            <Sidebar items={clientSidebarItems}  />
            <div className='wrapper'>
                <Header withSearch />
                <div className="content">
                    <Switch>
                        <Route exec path="/search/:value" >
                            <SearchPage />
                        </Route>
                        <Route exec path="/popular" >
                            <PopularPage />
                        </Route>
                        <Route exec path="/song/:songId">
                            <SongPage />
                        </Route>
                        <Route exec path="/playlists">
                            <MyPlaylistsPage />
                        </Route>
                        <Route exec path="/playlist/:playlistId">
                            <PlaylistPage />
                        </Route>
                        <Route exec path="/liked">
                            <LikedMusicPage />
                        </Route>
                        <Route exec path="/auth">
                            <AuthForm />	
                        </Route>
                        <Route exec path="/logout">
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
        </>
    )
}

export default ClientPages
