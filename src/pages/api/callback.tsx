import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
const client = require('../../app/lib/redis');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Here you can handle the callback parameters, for example, code and state in OAuth2
  const { code} = req.query;
  // Once done, you can redirect the user to the desired page
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    data: {
      code: code, 
      redirect_uri: "http://localhost:3000/api/callback",
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
  };
  
  try {
    const response = await axios.post(authOptions.url, authOptions.data, { headers: authOptions.headers });
    if (response.status === 200) {
      console.log('logged in')
      var access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      await client.set('accessToken', access_token);
      await client.set('refreshToken', refresh_token);
      
      const returnUrl = await client.get('savedUrl', (err: Error, reply: string) => {
        if (err) {
          console.error(err);
        } else {
          console.log('reply', reply);
        }
      });

      res.redirect(returnUrl);
    }
  } catch (error) {
    console.error(error);
  }
}

