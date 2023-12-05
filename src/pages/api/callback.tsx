import { NextApiRequest, NextApiResponse } from 'next'
import { getSavedPath } from '../api';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Here you can handle the callback parameters, for example, code and state in OAuth2
  const { code, state } = req.query;
  const savedPath = getSavedPath();
  console.log('code sate', {code, state, savedPath})
  // Validate state, exchange code for tokens, etc.

  // Once done, you can redirect the user to the desired page
  res.redirect('/')
}