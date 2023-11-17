'use client'
import { FormEvent, useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import {Button, Card, TextField, Typography} from '@mui/material';

interface Event{
  name: string
  startDate: string
  image: string
}

export default function Home() {
  const [citySearch, setCitySearch] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [events, setEvents] = useState<any>([]);

  useEffect(()=> {
    getEvents();
  },[])

  function mapEvents(eventList: any[]){
    const eventMap : any[] = eventList.map((event: Event, idx: number) => {
      return(
        <Card key={idx} variant="outlined" className='mb-10'>
          <img src={event?.image} width="500"/>
          <Typography className='mx-3'>{event?.name} </Typography>
          <Typography className='mx-3'>{event?.startDate} </Typography>
        </Card>
      )
    })
    setEvents(eventMap);
  } 

  async function getEvents(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    const results = await axios.get('/api/events');
    const {data} = results;
    mapEvents(data)
  }

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
