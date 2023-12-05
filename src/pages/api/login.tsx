const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation'
import open from 'open';

const generateRandomString = (length: number): string => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (!spotify_client_id) {
    throw new Error('Spotify Client ID is not defined');
  }
  try{
    const scope = "streaming user-read-email user-read-private";

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






