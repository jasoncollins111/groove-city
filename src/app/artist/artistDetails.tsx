import { Box, Button, Typography, Link } from '@mui/material';
import Image from 'next/image';
import {capitalizeAndReplace} from '../lib/utils';

interface Artist{
    artist:{
        genre: [
            string
        ]
        name: string
        identifier: string
        image: string
        sameAs: SocialLink[]
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

    return (
        <Box className="flex flex-col mt-4 items-center p-0 tablet:p-8 desktop:p-24">
            <Image src={artist.image} height='1000' width='1000' alt='photo of performer'/>
            <Typography className='hover:text-violet-700'>{artist.name}</Typography>
            <Typography>{capitalizeAndReplace(artist?.genre[0])}</Typography>
            {socialLinks}
        </Box>
    )
}