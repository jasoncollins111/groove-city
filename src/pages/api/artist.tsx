const jambaseAPIKEY = process.env.JAMBASE_API;
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const artistId = req?.query?.id;
    try {
        const results = await axios.get(`https://www.jambase.com/jb-api/v1/artists/id/${artistId}?apikey=${jambaseAPIKEY}`);
        const data = results?.data?.event
        return res.json(data);
        
    } catch (error) {
        return {
            message: 'Fetch Error: Failed to Find Event.',
          };
    }
}