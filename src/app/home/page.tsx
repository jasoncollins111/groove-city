'use client'
import { FormEvent, useCallback, useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import {Typography} from '@mui/material';
import SideNav from '../components/sidenav';
import ConcertCard from '../components/concertCard';

export interface Artist{
  genre: string
  name: string
}

export interface Offer{
  url: string
}

interface Event{
  startDate: string
  image: string
  performer: Array<Artist>
  offers: Array<Offer>
  location: {
    name: string
  }
}

export default function Home() {
  const [events, setEvents] = useState<any>([]);
  
  useEffect(()=> {
    getEvents();
  },[])

  const mapEvents = useCallback((eventList: any[]) => {
    const eventMap : any[] = eventList.map((event: Event, idx: number) => {
      const {location, performer, startDate, offers, image} = event;
      const venue = location.name;
      return(
        <ConcertCard eventData={{venue, performer, startDate, offers, image}}/>
      )
    })
    setEvents(eventMap);
  },[]) 

  async function getEvents(event?: FormEvent<HTMLFormElement>){
    event?.preventDefault()
    const results = await axios.get('/api/events');
    const {data} = results;
    return mapEvents(data);
  }



  return (
    <main className="w-full">
      <div className='absolute top-5 right-5'>
        <SideNav />
      </div>
      <div className="flex min-h-screen flex-col items-center p-0 tablet:p-8 desktop:p-24">
        <div className="flex z-10 max-w-5xl w-full items-center lg:flex justify-center">
          <Typography className='font-sans text-3xl'>Groove City </Typography>
        </div>
          <Typography className='font-sans text-xl mb-5'>Denver, CO</Typography>
        {/* <form onSubmit={getEvents}>
          <div className='block tablet:flex tablet:space-x-4 mb-10'>
            <TextField className="w-full" id="outlined-basic" label="city" variant="outlined" />
            <TextField className="w-full" id="outlined-basic" label="state" variant="outlined" />
            <Button className="w-full" type="submit" variant="contained">Find your groove</Button>
          </div>
        </form> */}
        {events}
      </div>
    </main>
  )
}
