const jambaseAPIKEY = process.env.JAMBASE_API;
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
const client = require('../../app/lib/redis');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const artistId = req?.query?.id;
    console.log('artistId', artistId)
    try {
        const results = await axios.get(`https://www.jambase.com/jb-api/v1/events?artistId=${artistId}&apikey=${jambaseAPIKEY}`);
        const data = results?.data?.events
        return res.json(data);
        
    } catch (error) {
        return {
            message: 'Fetch Error: Failed to Find Event.',
          };
    }
}