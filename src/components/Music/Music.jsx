import React from 'react'
import Title from '../Title';
import MusicItem from './MusicItem';

const Music = ({music, playSong, isPlaying, activeTrack}) => {

    return (
        <>
        <div className="myRow">
            <div className="myCol">
                <Title type="subtitle"  title="My Music" subtitle={music.length + " Songs"} />
                    </div>
                </div>
                <div className="music">
                    <ul className="music__list">
                        {
                            music && music.map(song => {
                                return <MusicItem 
                                    key={"song-"+song.id}
                                    id={song.id}
                                    title={song.title}
                                    img={song.img}
                                    artist={song.artist}
                                    playSong={playSong}
                                    isPlaying={isPlaying}
                                    activeTrack={activeTrack}
                                />
                            })
                        }
                    </ul>
                </div>
                </>
    )
}

export default Music
