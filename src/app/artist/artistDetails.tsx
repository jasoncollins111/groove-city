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
    }
}

export default function ArtistDetails(props: Artist) {
    const {artist} = props;

    return (
        <Box className="flex flex-col mt-4 items-center p-0 tablet:p-8 desktop:p-24">
            <Link className='no-underline' href={`/artist?performer=${artist.identifier}`}>
                <Image src={artist.image} height='200' width='200' alt='photo of performer'/>
                <Typography className='hover:text-violet-700'>{artist.name}</Typography>
            </Link>
            <Typography>{capitalizeAndReplace(artist?.genre[0])}</Typography>
        </Box>
    )
}