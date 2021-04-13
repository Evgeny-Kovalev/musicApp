import React from 'react'
import PlaylistItem from './PlaylistItem';

const Playlists = ({playlists}) => {

    return (
        <div className="playlists">
            <ul className="playlists__list myRow">
                {
                    playlists && playlists.map(playlist => {
                        return (
                            <PlaylistItem
                                key={"p-" + playlist.id}
                                id={playlist.id}
                                title={playlist.title}
                                img={playlist.img}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Playlists
