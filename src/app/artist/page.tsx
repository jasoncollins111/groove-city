'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import Loading from '../loading';
import ArtistDetails from './artistDetails';
import Header from '../components/header'

export default function Artist() {
    const searchParams = useSearchParams()
    const [artist, setArtist] = useState({image: ''});
    const [events, setEvents] = useState([]);

    useEffect(()=> {
        getArtist();
    },[])

    async function getArtist(){
        const id = searchParams?.get('performer')
        const artistEvents = await axios.get('/api/artistEvents', { params: { id } });
        const artistResults = await axios.get('/api/artist', { params: { id } });
        const events = artistEvents.data;
        const {data} = artistResults;
        setArtist(data);
        setEvents(events);
    }

    async function login(){
        const id = searchParams?.get('performer')
        await axios.get('/api/login', { params: { id } });
    }

    return (
        <main>
            <Header/>
            {!artist?.image ? <Loading/> : <ArtistDetails artist={artist} events={events}/> }
        </main>
    )
}