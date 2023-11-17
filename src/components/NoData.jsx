import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function NoData() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <i className='fa-solid fa-triangle-exclamation fa-2xl'></i>
    </Box>
  );
}
