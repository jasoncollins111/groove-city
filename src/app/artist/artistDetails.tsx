import { useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';

interface Artist{
    artist?:{
        genre?: []
        name?: string
        identifier?: string
        image?: string
        sameAs?: SocialLink[]
    }
    events?:any[]
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
    const {artist, events} = props;

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

    const artistEvents = events?.map((event, idx) => {
        return (
            <Typography key={idx}>{event?.location?.name} - {event.startDate}</Typography>
        )
    })

    return (
        <Box className="flex flex-col mt-4 items-center p-0 tablet:p-8 desktop:p-24">
            {artist?.image && <Image src={artist?.image} height='700' width='1000' alt='photo of performer'/>}
            <Typography className='hover:text-violet-700'>{artist?.name}</Typography>
            {artistEvents}
            {socialLinks}
        </Box>
    )
}


