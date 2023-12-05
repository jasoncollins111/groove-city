import React, { useEffect } from 'react';

declare global {
  interface Window { Spotify: any; }
}

interface SpotifyPlayerProps {
  token: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ token }) => {
  useEffect(() => {
    if (window.Spotify) {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Template',
        getOAuthToken: (cb: (token: string) => void) => { cb(token); }
      });

      // Error handling
      player.addListener('initialization_error', ({ message }: { message: string }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }: { message: string }) => { console.error(message); });
      player.addListener('account_error', ({ message }: { message: string }) => { console.error(message); });
      player.addListener('playback_error', ({ message }: { message: string }) => { console.error(message); });

      // Playback status updates
      player.addListener('player_state_changed', (state: any) => { console.log(state); });

      // Ready
      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
    };
  }, [token]);

  return null; // or return some JSX for a loading spinner, etc.
}

export default SpotifyPlayer;