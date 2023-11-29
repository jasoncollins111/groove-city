import {Box, Card, Link, Typography} from '@mui/material';
import Image from 'next/image';
import {DateTime} from "luxon";
import {Artist, Offer} from './concertFeed';
import {capitalizeAndReplace} from '../lib/utils';

interface Event{
    eventData: {
        startDate: string
        image: string
        performer: Array<Artist>
        offers: Array<Offer>
        venue: string
        identifier: string
    }
  }

export default function ConcertCard(props: Event) {

    const {eventData} = props;
    const {venue, performer, startDate, offers, image, identifier} = eventData;
    const date = DateTime.fromISO(startDate);
    const formattedDate = date.toLocaleString(DateTime.DATETIME_MED);
    const genre = performer[0]?.genre[0] ? capitalizeAndReplace(performer[0].genre[0]) : "Live Music";
    const ticketLink = offers[0].url || '';
    const artist = performer[0].name;

    return (
        <Card key={`${artist}-${venue}`} variant="outlined" className='mb-10 w-full tablet:w-6/12 desktop:w-5/12'>
            <Image src={image} width="700" height="700" alt="Picture of artist"/>
            <Box className='flex justify-between'>
                <Typography className='mx-3'>{formattedDate}</Typography>
                <Typography className='mx-3 italic'>{genre}</Typography>
            </Box>
            <Box className='flex justify-between mb-1'>
                <Link className='no-underline' href={`/event?id=${identifier}`}>
                    <Typography className='text-xl mx-3'>{artist}</Typography>
                    <Typography className='text-xl mx-3'>{venue}</Typography>
                </Link>
                <Link className='mx-3 text-lg no-underline' href={ticketLink}>Tickets</Link>
            </Box>
        </Card>
    )
}