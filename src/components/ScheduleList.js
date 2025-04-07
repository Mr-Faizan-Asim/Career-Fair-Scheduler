// src/components/ScheduleList.js
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Container, Grid, Card, CardContent, Typography, Chip, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'ScheduleFair'), orderBy('date', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(list);
    });
    return () => unsubscribe();
  }, []);

  const filteredSchedules = schedules.filter(schedule =>
    schedule.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Career Fair Schedule
      </Typography>
      <TextField 
        fullWidth 
        label="Search by Company" 
        variant="outlined" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        sx={{ mb: 4 }}
      />
      <Grid container spacing={3}>
        {filteredSchedules.map(schedule => (
          <Grid item xs={12} sm={6} md={4} key={schedule.id}>
            <Card
              sx={{
                borderLeft: '5px solid',
                borderColor: schedule.eventType === 'workshop'
                  ? 'secondary.main'
                  : schedule.eventType === 'test'
                    ? 'error.main'
                    : 'primary.main'
              }}
            >
              <CardContent>
                <Typography variant="h6">{schedule.company}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {schedule.eventType.toUpperCase()}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {schedule.date} at {schedule.time}
                </Typography>
                <Chip label={schedule.location} sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
