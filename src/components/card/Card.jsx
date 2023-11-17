import { CardContent, Typography, Card } from '@mui/material';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function CardContainer() {
  const { error, count } = useSelector((state) => state.api);

  return (
    !error && (
      <Card sx={{ minWidth: 275, maxWidth: 300, boxShadow: 3 }}>
        <CardContent>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 700,
              fontFamily: 'Titillium Web',
            }}
            color='text.secondary'
            gutterBottom
          >
            {`Total count: ${count}`}
          </Typography>
        </CardContent>
      </Card>
    )
  );
}
