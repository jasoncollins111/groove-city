import { Box, Button, Typography, Link } from '@mui/material';
import { useState } from 'react'

import Image from 'next/image';
import {capitalizeAndReplace} from '../lib/utils';
import {DateTime} from "luxon";

interface EventData{
    eventData:{
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
  }
interface Performer{
    genre: [
        string
    ]
    name: string
    identifier: string
    image: string
}

export default function EventDetails(props: EventData) {
    const {eventData} = props;
    const performers = eventData?.performer?.map((artist, idx) => {
        return(
            <Box className="mx-4" key={idx}>
                <Link className='no-underline' href={`/artist?performer=${artist.identifier}`}>
                    <Image src={artist.image} height='300' width='300' alt='photo of performer'/>
                    <Typography className='text-xl'>{artist.name}</Typography>
                </Link>
                <Typography>{capitalizeAndReplace(artist?.genre[0])}</Typography>

            </Box>
        )
    }).slice(1)
    const headliner = eventData?.performer[0].name;
    const headlinerLink = `/artist?performer=${eventData?.performer[0]?.identifier}`
    const venue = eventData?.location.name;
    const ticketLink = eventData?.offers[0].url;
    const date = DateTime.fromISO(eventData?.startDate);
    const formattedDate = date.toLocaleString(DateTime.DATETIME_MED);

    return (
        <main className="flex flex-col mt-16 items-center p-0 tablet:p-8 desktop:p-24">
            <Box className="flex mb-8">
                <Link className='text-white no-underline hover:text-cyan-500 hover:underline' href={headlinerLink}>
                    <Typography className='text-4xl mx-3'>{headliner}</Typography>
                </Link>
            </Box>
            {eventData?.image && <Image src={eventData?.image} width="1000" height="1000" alt="Picture of artist"/>}
            <Box className="items-center flex flex-col mb-8 mt-8">
                <Typography className='text-3xl mx-3'>{venue}</Typography>
                <Typography className='text-xl mx-3'>{formattedDate}</Typography>
            </Box>
            <Button variant='contained' className='mx-3 mb-16 text-lg no-underline' href={ticketLink}>Tickets</Button>
            {performers.length > 0 && <Typography className='text-2xl mb-4 underline'>Supporting Artists</Typography>}
            <Box className="flex w-full justify-center">
                {performers}
            </Box>
        </main>
    )
}