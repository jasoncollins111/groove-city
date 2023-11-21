import {Box, Card, Link, Typography} from '@mui/material';
import Image from 'next/image';
import {DateTime} from "luxon";
import {Artist, Offer} from '../home/page';
import { capitalizeAndReplace } from '../lib/utils';
interface Event{
    eventData: {
        startDate: string
        image: string
        performer: Array<Artist>
        offers: Array<Offer>
        venue: string
    }
  }

export default function ConcertCard(props: Event) {

    const {eventData} = props;
    const {venue, performer, startDate, offers, image} = eventData;
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
                <Typography className='mx-3'>{genre}</Typography>
            </Box>
            <Box className='flex justify-between mb-1'>
                <Typography className='text-xl mx-3'>{artist} at {venue}</Typography>
                <Link className='mx-3 text-lg no-underline' href={ticketLink}>Tickets</Link>
            </Box>
        </Card>
    )

}