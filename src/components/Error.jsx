import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function ErrorComponent() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <i className='fa-solid fa-circle-exclamation fa-2xl'></i>
    </Box>
  );
}
