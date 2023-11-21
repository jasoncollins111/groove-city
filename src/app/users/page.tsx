import {getUser} from '../lib/data';
import { unstable_noStore as noStore } from 'next/cache';



export default async function Users() {
    noStore();
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    const user = await getUser('user@nextmail.com')
    return (
        <main>
            <div className='absolute top-5 right-5'>yooooo</div>
        <p>
            Users: {user.name}
        </p>
        </main>
    )
}
