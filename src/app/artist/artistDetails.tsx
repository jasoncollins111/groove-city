import { useState, useEffect } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useSearchParams } from 'next/navigation'
import PlayCircleFilled from '@mui/icons-material/PlayCircleFilled';
import Image from 'next/image';
import axios from 'axios';
import WebPlayback from './webPlayer';

interface Artist{
    artist?:{
        genre?: []
        name?: string
        identifier?: string
        image?: string
        sameAs?: SocialLink[]
    }
}

interface SocialLink {
    identifier: keyof SocialPlatforms
    url: string
}

interface SocialPlatforms {
    facebook: string;
    instagram: string;
    officialSite: string;
    spotify: string;
    twitter: string;
    youtube: string;
}

export default function ArtistDetails(props: Artist) {
    const {artist} = props;
    const [token, setToken] = useState('');
    const [artistUri, setArtistUri] = useState('');
    const searchParams = useSearchParams()

    // useEffect(()=>{
    //     if(!token){
    //         // login();
    //     }
    // },[token])
    const socialPlatforms: SocialPlatforms = {
        facebook: 'Facebook',
        instagram: 'Instagram',
        officialSite: 'Official Site',
        spotify: 'Spotify',
        twitter: 'Twitter',
        youtube: 'Youtube'
    };
    
    const socialLinks = artist?.sameAs?.reduce((links: JSX.Element[], link, idx)=> {
        if(link && socialPlatforms[link?.identifier]){
            links.push(<Link key={idx} href={link?.url}>{socialPlatforms[link?.identifier]}</Link>)
        }
        return links;
    },[] as JSX.Element[]);

    async function spotifyPlayer(){
        const {data} = await axios.get('/api/token');
        console.log('data token', data)
        setToken(data);
        const spotifyArtist = await axios.get(`/api/spotify-search?artist=${artist?.name}`)
        setArtistUri(spotifyArtist?.data);
    }

    // async function login(){
    //     const id = searchParams?.get('performer')
    //     const results = await axios.get('/api/login', { params: { id } });
    //     console.log('results', results)
    //     // const {data} = results;
    //     // setArtist(data);
    // }


    // const genre = artist?.genre ? capitalizeAndReplace(artist?.genre[0]) : 'Live Music'
    // if(artist?.genre){
    //     capitalizeAndReplace(artist?.genre[0])
    // }
    // const genre = artist?.genre.length >  ? capitalizeAndReplace(artist?.genre[0]) : 'Live Music'
    return (
        <Box className="flex flex-col mt-4 items-center p-0 tablet:p-8 desktop:p-24">
            {artist?.image && <Image src={artist?.image} height='700' width='1000' alt='photo of performer'/>}
            <Typography className='hover:text-violet-700'>{artist?.name}</Typography>
            <PlayCircleFilled onClick={spotifyPlayer}/>
            {token && <WebPlayback token={token}/> }
            {socialLinks}
        </Box>
    )
}


// {token && <WebPlayback token={token}/> }
