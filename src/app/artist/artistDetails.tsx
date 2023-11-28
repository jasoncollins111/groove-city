// import { Box, Button, Typography, Link } from '@mui/material';
// import Image from 'next/image';
// import {capitalizeAndReplace} from '../lib/utils';



// export default function ArtistDetails(props: ArtistData) {
//     const {eventData} = props;

//     const performers = eventData?.performer?.map((artist, idx) => {
//         return(
//             <Box className="" key={idx}>
//                 <Link className='no-underline' href={`/artist?performer=${artist.identifier}`}>
//                     <Image src={artist.image} height='200' width='200' alt='photo of performer'/>
//                     <Typography>{artist.name}</Typography>
//                 </Link>
//                 <Typography>{capitalizeAndReplace(artist?.genre[0])}</Typography>

//             </Box>
//         )
//     })

//     const venue = eventData?.location.name;
//     const ticketLink = eventData?.offers[0].url;

//     return (
//         <main className="flex flex-col mt-4 items-center p-0 tablet:p-8 desktop:p-24">
//             <Box className="flex mb-8">
//                 <Typography className='text-4xl mx-3'>{eventData?.name}</Typography>
//             </Box>
//             {eventData?.image && <Image src={eventData?.image} width="1000" height="1000" alt="Picture of artist"/>}
//             <Box className="flex mb-8 mt-8">
//                 <Typography className='text-2xl mx-3'>{venue}</Typography>
//             </Box>
//             <Typography className='text-xl mb-4 underline'>Artists</Typography>
//             <Box className="flex w-full justify-around">
//                 {performers}
//             </Box>
//             <Button variant='contained' className='mx-3 mt-16 text-lg no-underline' href={ticketLink}>Tickets</Button>
//         </main>
//     )
// }