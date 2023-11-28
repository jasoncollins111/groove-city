'use client'
import { useEffect, useState } from 'react'
import { Box, Button, Typography, Link } from '@mui/material';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import Image from 'next/image';
import {capitalizeAndReplace} from '../lib/utils';
import Loading from '../loading';
import EventDetails from './eventDetails';
interface EventData{
    image: string
    name: string
    performer: [
        Performer
    ]
    location: {
        name: string
    }
    offers: [
        {
            url: string
        }
    ]
  }
interface Performer{
    genre: [
        string
    ]
    name: string
    identifier: string
    image: string
}
export default function Event() {
    const searchParams = useSearchParams()
    const [eventData, setEventData] = useState<EventData>({location: {name: ''}, offers: [{url: ''}], image: '', name: '', performer: [{genre:[''], name:'', identifier: '', image: ''}]});

    useEffect(()=> {
        getEvent();
    },[])

    async function getEvent(){
        const id = searchParams?.get('id')
        const results = await axios.get('/api/event', { params: { id } });
        const {data} = results;
        setEventData(data);
    }

    return (
        <main>
            {!eventData.image ? <Loading/> : <EventDetails eventData={eventData}/> }
        </main>
    )
}