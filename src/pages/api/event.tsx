const jambaseAPIKEY = process.env.JAMBASE_API;
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { redirect } from 'next/navigation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req?.query?.id;
    try {
        const results = await axios.get(`https://www.jambase.com/jb-api/v1/events/id/${id}?apikey=${jambaseAPIKEY}`);
        const data = results?.data?.event
        return res.json(data);
        
    } catch (error) {
        return {
            message: 'Fetch Error: Failed to Find Event.',
          };
    }
}