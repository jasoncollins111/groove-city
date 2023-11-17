const jambaseAPIKEY = process.env.JAMBASE_API;
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
    const results = await axios.get(`https://www.jambase.com/jb-api/v1/events?geoCityId=jambase%3A4227820&geoCountryIso2=US&apikey=${jambaseAPIKEY}`)
    const data = results?.data?.events
    res.json(data);
}