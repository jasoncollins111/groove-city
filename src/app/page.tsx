'use client'
import { FormEvent, useCallback, useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import {Box, Button, Card, Link, TextField, Typography} from '@mui/material';
import {DateTime} from "luxon";
import Image from 'next/image';

interface Artist{
  genre: string
  name: string
}

interface Offer{
  url: string
}

interface Event{
  name: string
  startDate: string
  image: string
  performer: Array<Artist>
  offers: Array<Offer>
  location: {
    name: string
  }
}

export default function Home() {
  const [citySearch, setCitySearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [events, setEvents] = useState<any>([]);

  useEffect(()=> {
    getEvents();
  })

  function mapEvents(eventList: any[]){
    const eventMap : any[] = eventList.map((event: Event, idx: number) => {
      const {location, performer, startDate, offers} = event;
      const date = DateTime.fromISO(startDate);
      const month = date.month;
      const day = date.day;
      const genre = performer[0].genre[0];
      const ticketLink = offers[0].url || '';
      const venue = location.name;
      const artist = performer[0].name;

      return(
        <Card key={idx} variant="outlined" className='mb-10'>
          <Image src={event?.image} width="700" height="700" alt="Picture of artist"/>
          <Box className='flex justify-between'>
            <Typography className='mx-3'>{month}/{day} </Typography>
            <Typography className='mx-3'>{artist} @ {venue}</Typography>
            <Typography className='mx-3'>{genre}</Typography>
          </Box>
          <Box className='flex justify-end'>
            <Link className='mx-3' href={ticketLink}>Tickets</Link>
          </Box>
        </Card>
      )
    })
    setEvents(eventMap);
  } 

  const getEvents = useCallback(async(event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    const results = await axios.get('/api/events');
    const {data} = results;
    mapEvents(data)
  }, [mapEvents])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center lg:flex mb-10 justify-center">
        <Typography className='font-sans text-3xl'>Groove City</Typography>
      </div>
      <form onSubmit={getEvents}>
        <div className='flex space-x-4 mb-10'>
          <TextField id="outlined-basic" label="city" variant="outlined" />
          <TextField id="outlined-basic" label="state" variant="outlined" />
          <Button type="submit" variant="contained">Find your groove</Button>
        </div>
      </form>
      {events}
    </main>
  )
}
