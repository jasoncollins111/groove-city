'use client'
import { FormEvent, useCallback, useEffect, useState, Suspense } from 'react'
import axios from 'axios';
import ConcertCard from './concertCard';
import Loading from '../loading';

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

export default function ConcertFeed() {
    const [events, setEvents] = useState<any>([]);
    useEffect(()=> {
      getEvents();
    },[])
  
    const mapEvents = useCallback((eventList: any[]) => {
      const eventMap : any[] = eventList.map((event: Event, idx: number) => {
        const {location, performer, startDate, offers, image} = event;
        const venue = location.name;
        return(
          <ConcertCard key={idx} eventData={{venue, performer, startDate, offers, image}}/>
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

    return(
        <section className='flex flex-col items-center p-0 tablet:p-8 desktop:p-24'>
            {events.length ? events : <Loading/>}
        </section>

    )




}
