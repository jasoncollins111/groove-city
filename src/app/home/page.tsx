'use client'
import { Suspense } from 'react'
import {Typography} from '@mui/material';
import SideNav from '../components/sidenav';
import ConcertFeed from '../components/concertFeed';

export default function Home() {

  return (
    <main className="w-full">
      <div className='absolute top-5 right-5'>
        <SideNav />
      </div>
      <div className="flex flex-col items-center p-0 tablet:p-8 desktop:p-24">
        <div className="flex z-10 max-w-5xl w-full items-center lg:flex justify-center">
          <Typography className='font-sans text-3xl'>Groove City </Typography>
        </div>
          <Typography className='font-sans text-xl mb-5'>Denver, CO</Typography>
      </div>
        <ConcertFeed/>
    </main>
  )
}





{/* <form onSubmit={getEvents}>
    <div className='block tablet:flex tablet:space-x-4 mb-10'>
    <TextField className="w-full" id="outlined-basic" label="city" variant="outlined" />
    <TextField className="w-full" id="outlined-basic" label="state" variant="outlined" />
    <Button className="w-full" type="submit" variant="contained">Find your groove</Button>
    </div>
</form> */}