import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
const client = require('../../app/lib/redis');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const artistId = req?.query?.artist
    const token = await client.get('accessToken')
    try {
        const results = await axios.get(`https://api.spotify.com/v1/search?q=${artistId}&artist=${artistId}&type=track&limit=1&access_token=${token}`);
        const artistUri = results?.data.tracks.items[0].artists[0].uri;
        const options = {
            data: {
              context_uri: artistUri,
            },
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type' : 'application/json'
            }
          };
        await axios.put(`https://api.spotify.com/v1/me/player/play`, options.data, {headers: options.headers})
        return res.json(artistUri);
    } catch (error) {
        return {
            message: 'Fetch Error: Failed to Find Artist.',
          };
    }
}


