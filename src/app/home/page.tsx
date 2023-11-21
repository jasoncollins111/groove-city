'use client'
import { FormEvent, useCallback, useEffect, useMemo } from 'react'
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

  function capitalizeAndReplace(inputString: string) {
    return inputString.replace(/-([a-z])/g, function(match, group1) {
      return ' ' + group1.toUpperCase();
    }).replace(/^\w/, function(firstLetter) {
      return firstLetter.toUpperCase();
    });
  }

  const mapEvents = useCallback((eventList: any[]) => {
    const eventMap : any[] = eventList.map((event: Event, idx: number) => {
      const {location, performer, startDate, offers} = event;
      const date = DateTime.fromISO(startDate);
      const month = date.month;
      const day = date.day;
      const genre = performer[0].genre[0] ? capitalizeAndReplace(performer[0].genre[0]) : "Live Music";
      const ticketLink = offers[0].url || '';
      const venue = location.name;
      const artist = performer[0].name;

      return(
        <Card key={idx} variant="outlined" className='mb-10 w-full tablet:w-6/12 desktop:w-5/12'>
          <Image src={event?.image} width="700" height="700" alt="Picture of artist"/>
          <Box className='flex justify-between'>
            <Typography className='mx-3'>{month}/{day} </Typography>
            <Typography className='mx-3'>{genre}</Typography>
          </Box>
          <Box className='flex justify-start'>
            <Typography className='text-xl mx-3'>{artist} at {venue}</Typography>
          </Box>
          <Box className='flex justify-end'>
            <Link className='mx-3 text-lg' href={ticketLink}>Tickets</Link>
          </Box>
        </Card>
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
    <main className="flex min-h-screen flex-col items-center p-0 tablet:p-8 desktop:p-24">
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
    </main>
  )
}
