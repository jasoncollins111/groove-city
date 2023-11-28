'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import Loading from '../loading';
// import ArtistDetails from './artistDetails';
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
export default function Artist() {
    const searchParams = useSearchParams()
    const [artistData, setArtistData] = useState<EventData>({location: {name: ''}, offers: [{url: ''}], image: '', name: '', performer: [{genre:[''], name:'', identifier: '', image: ''}]});

    useEffect(()=> {
        getArtist();
    },[])

    async function getArtist(){
        const id = searchParams?.get('performer')
        console.log('getartist',id)
        const results = await axios.get('/api/artist', { params: { id } });
        console.log('results', results)
        const {data} = results;
        setArtistData(data);
    }

    return (
        <main>
            {/* {!artistData.image ? <Loading/> : <ArtistDetails artistData={artistData}/> } */}
        </main>
    )
}