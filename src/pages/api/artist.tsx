const jambaseAPIKEY = process.env.JAMBASE_API;
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
const client = require('../../app/lib/redis');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const artistId = req?.query?.id;
    await client.set('savedUrl', `/artist?performer=${artistId}`, (err: Error, reply: string) => {
        if(err){
            console.log('err', err);
        } else{
            console.log('reply', reply);
        }
    });

    try {
        const results = await axios.get(`https://www.jambase.com/jb-api/v1/artists/id/${artistId}?apikey=${jambaseAPIKEY}`);
        const data = results?.data?.artist
        return res.json(data);
        
    } catch (error) {
        return {
            message: 'Fetch Error: Failed to Find Artist.',
          };
    }
}