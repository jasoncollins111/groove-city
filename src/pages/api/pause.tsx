import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
    const {token} = req?.query;

    await axios.put(`https://api.spotify.com/v1/me/player/pause?access_token=${token}`, {
    headers: {
        Authorization: `Bearer ${token}`,
    //   'Content-Type': 'application/json',
    },
    }).then((response) => {
        console.log(response);
        res.status(200)
    }).catch((error) => {
        res.status(500)
        console.error(error.response.data); // Use error.response.data instead of error[^2^][1]
    });
    console.log('yooooo')
    res.status(200).json({message: 'toggle'})

}