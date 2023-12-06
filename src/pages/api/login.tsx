const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation'
import open from 'open';
const client = require('../../app/lib/redis');

const generateRandomString = (length: number): string => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const artistId = req?.query?.id;
  if (!spotify_client_id) {
    throw new Error('Spotify Client ID is not defined');
  }

  await client.set('savedUrl', `/artist?performer=${artistId}`, (err: Error, reply: string) => {
    if(err){
        console.log('err', err);
    } else{
        console.log('reply', reply);
    }
  });

  try{
    const scope = "streaming user-modify-playback-state user-read-email user-read-private";

    const state = generateRandomString(16);
    const auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: spotify_client_id,
      scope: scope,
      redirect_uri: "http://localhost:3000/api/callback",
      state: state
    });

    const url = `https://accounts.spotify.com/authorize/?${auth_query_parameters.toString()}/`
    open(url)
  } catch(err){
    console.log('err', err)
  }
}






