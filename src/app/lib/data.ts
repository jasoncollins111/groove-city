import { sql, createPool } from '@vercel/postgres';
import {User} from './definitions';
const jambaseAPIKEY = process.env.JAMBASE_API;
const POSTGRES_URL = process.env.POSTGRES_URL;
const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
  });
export async function getUser(email: string) {
    try {
      const user = await pool.sql`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0] as User;

    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
}