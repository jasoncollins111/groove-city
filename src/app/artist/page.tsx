'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import Loading from '../loading';
import ArtistDetails from './artistDetails';

export default function Artist() {
    const searchParams = useSearchParams()
    const [artist, setArtist] = useState({image: ''});

    useEffect(()=> {
        getArtist();
    },[])

    async function getArtist(){
        const id = searchParams?.get('performer')
        // await login();
        const results = await axios.get('/api/artist', { params: { id } });
        const {data} = results;
        setArtist(data);
    }

    async function login(){
        const id = searchParams?.get('performer')
        await axios.get('/api/login', { params: { id } });
    }

    return (
        <main>
            {!artist?.image ? <Loading/> : <ArtistDetails artist={artist}/> }
        </main>
    )
}