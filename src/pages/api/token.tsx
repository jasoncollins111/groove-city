const jambaseAPIKEY = process.env.JAMBASE_API;
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
const client = require('../../app/lib/redis');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await client.get('accessToken')
        return res.json(data);
        
    } catch (error) {
        return {
            message: 'Fetch Error: Failed to Find Event.',
          };
    }
}