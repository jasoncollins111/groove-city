import {Box, CircularProgress} from '@mui/material';

export default function Loading() {
  return (
    <Box className="flex flex-col items-center mt-56">
      <CircularProgress />
    </Box>
  )
}