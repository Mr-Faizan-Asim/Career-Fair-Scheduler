import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';

export default function ScheduleList() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Career Fair Schedule
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: 'red' }}>
        Due to heavy rain, all scheduled events have been postponed. A new date will be announced soon, Inshallah.
      </Typography>
    </Container>
  );
}
