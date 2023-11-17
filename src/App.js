import './App.css';
import CustomTable from './components/Table/CustomTable';

import { Container, Stack } from '@mui/material';
import CardContainer from './components/card/Card';

function App() {
  return (
    <Container sx={{ marginBlock: 5 }}>
      <Stack gap={10}>
        <CustomTable />
        <CardContainer />
      </Stack>
    </Container>
  );
}

export default App;
