'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import Loading from '../loading';
import ArtistDetails from './artistDetails';

interface ArtistData{
    genre: [
        string
    ]
    name: string
    identifier: string
    image: string
}
export default function Artist() {
    const searchParams = useSearchParams()
    const [artist, setArtist] = useState<ArtistData>({genre: [''], name: '', identifier: '', image: ''});

    useEffect(()=> {
        getArtist();
    },[])

    async function getArtist(){
        const id = searchParams?.get('performer')
        const results = await axios.get('/api/artist', { params: { id } });
        const {data} = results;
        setArtist(data);
    }

    return (
        <main>
            {!artist.image ? <Loading/> : <ArtistDetails artist={artist}/> }
        </main>
    )
}