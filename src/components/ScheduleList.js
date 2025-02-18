import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Helper to convert a 24-hour time string (e.g., "13:30") to 12-hour format with AM/PM.
const convertTo12Hour = (timeStr) => {
  const [hourStr, minute] = timeStr.split(':');
  let hour = parseInt(hourStr, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${suffix}`;
};

// Helper to add hours to a time string and return the new time in 12-hour format.
const addHoursToTime = (timeStr, hrsToAdd) => {
  const [hourStr, minute] = timeStr.split(':');
  let newHour = (parseInt(hourStr, 10) + hrsToAdd) % 24;
  // Format newHour as two-digit if needed for proper parsing.
  const newTimeStr = `${newHour < 10 ? '0' + newHour : newHour}:${minute}`;
  return convertTo12Hour(newTimeStr);
};

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Query to order schedules by date and time in ascending order.
    const q = query(
      collection(db, 'ScheduleFair'),
      orderBy('date', 'asc'),
      orderBy('time', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSchedules(list);
    });
    return () => unsubscribe();
  }, []);

  const filteredSchedules = schedules.filter((schedule) =>
    schedule.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if current time is more than one hour after the event start time.
  const checkEventStatus = (date, time) => {
    const eventDateTime = new Date(`${date}T${time}`);
    const oneHourLater = new Date(eventDateTime.getTime() + 60 * 60 * 1000);
    const now = new Date();
    return now > oneHourLater;
  };

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
        onChange={(e) => setSearchTerm(e.target.value)}
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
        {filteredSchedules.map((schedule) => (
          <Grid item xs={12} sm={6} md={4} key={schedule.id}>
            <Card
              sx={{
                borderLeft: '5px solid',
                borderColor:
                  schedule.eventType === 'interview'
                    ? 'secondary.main'
                    : schedule.eventType === 'test'
                    ? 'error.main'
                    : 'primary.main',
                position: 'relative'
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: checkEventStatus(schedule.date, schedule.time)
                    ? 'red'
                    : 'transparent',
                  position: 'absolute',
                  top: 16,
                  right: 16
                }}
              />
              <CardContent>
                <Typography variant="h6">{schedule.company}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {schedule.eventType.toUpperCase()}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {schedule.date} at {convertTo12Hour(schedule.time)} ending at{' '}
                  {addHoursToTime(schedule.time, 2)}
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
