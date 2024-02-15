'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import Loading from '../loading';
import EventDetails from './eventDetails';
import Header from '../components/header'

interface EventData{
    image: string
    name: string
    startDate: string
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
    const [eventData, setEventData] = useState<EventData>({location: {name: ''}, offers: [{url: ''}], startDate: '', image: '', name: '', performer: [{genre:[''], name:'', identifier: '', image: ''}]});

    useEffect(()=> {
        getEvent();
    },[])

    async function getEvent(){
        const id = searchParams?.get('id')
        const results = await axios.get('/api/event', { params: { id } });
        const artist = await axios.get('/api/artist', { params: { id: 'jambase:250575' } });

        const {data} = results;
        setEventData(data);
    }

    return (
        <main>
            <Header/>
            {!eventData.image ? <Loading/> : <EventDetails eventData={eventData}/> }
        </main>
    )
}