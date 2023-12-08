'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface PlayerProps {
    token: string;
}

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: () => void;
        Spotify: typeof Spotify;
        player: any; 
    }
}

interface Player {
    previousTrack: () => Promise<void>;
    nextTrack: () => Promise<void>;
    togglePlay: () => Promise<void>;
    // Add other methods and properties as needed
  }

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}


const WebPlayback: React.FC<PlayerProps> = (props: PlayerProps) => {
    const [player, setPlayer] = useState<Player | null>(null);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);
    
    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = false;
        script.defer = true;
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        // script.onload = () => resolve();
        // script.onerror = (error: any) => reject(new Error(`loadScript: ${error.message}`));
  

        document.head.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: (cb: (token: string) => void) => { cb(props.token); },
                volume: 0.5
            });
            
            player.addListener('ready', ({ device_id }: { device_id: string }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ((state: Spotify.PlaybackState | null) => {

                if (!state) {
                    return;
                }
            
                setTrack(state.track_window.current_track);
                setPaused(state.paused);
            
            
                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });
            
            }));

            player.connect();
            setPlayer(player);

        };
    }, []);

    async function nextTrack(){
        await axios.get('/api/play-next', { params: { token: props.token } });

        // if (player) {
        //     player.nextTrack().then(() => {
        //         console.log('Skipped to next track!');
        //     });
        // } else {
        //     console.log('Player is not initialized');
        // }
    }

    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <Image src={current_track.album.images[0].url} width='200' height='200' className="now-playing__cover" alt="" />

                    <div className="now-playing__side">
                        <div className="now-playing__name">{current_track.name}</div>
                        <div className="now-playing__artist">{current_track.artists[0].name}</div>
                        {/* <button className="btn-spotify" onClick={() => { previousTrack() }} >&lt;&lt;</button> */}
                        {/* <button className="btn-spotify" onClick={() => { player?.togglePlay() }}>{ is_paused ? "PLAY" : "PAUSE" }</button> */}
                        <button className="btn-spotify" onClick={() => { nextTrack() }}>&gt;&gt;</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WebPlayback;
