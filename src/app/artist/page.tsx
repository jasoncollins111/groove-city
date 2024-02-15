'use client'
import { useEffect, useMemo, useState } from 'react'
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

    const getArtist = useMemo(() => async () => {
        const id = searchParams?.get('performer')
        const artistEvents = await axios.get('/api/artistEvents', { params: { id } });
        const artistResults = await axios.get('/api/artist', { params: { id } });
        const events = artistEvents.data;
        const {data} = artistResults;
        setArtist(data);
        setEvents(events);
    },[])

    return (
        <main>
            <Header/>
            <ArtistDetails artist={artist} events={events}/>
            {/* {!artist?.image ? <Loading/> : <ArtistDetails artist={artist} events={events}/> } */}
        </main>
    )
}