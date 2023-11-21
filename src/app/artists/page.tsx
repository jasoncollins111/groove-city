'use client'

import {Box} from '@mui/material';
import SideNav from '../components/sidenav';

export default function Artists() {
    return (
        <main>
            <div className='absolute top-5 right-5'>
            <SideNav />
        </div>
        <Box>
                artists
            </Box>
        </main>
    )
}