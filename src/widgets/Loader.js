import { Box } from '@mui/material';

export default function Loader() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <i className='fa-solid fa-spinner fa-spin fa-2xl'></i>
    </Box>
  );
}
