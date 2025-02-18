import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
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
  Box,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Converts a 24-hour time string (e.g., "13:30") to 12-hour format with AM/PM.
 *
 * @param {string} timeStr - The time string in "HH:mm" format.
 * @returns {string} The formatted time in 12-hour format.
 */
const convertTo12Hour = (timeStr) => {
  const [hourStr, minute] = timeStr.split(':');
  let hour = parseInt(hourStr, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${suffix}`;
};

/**
 * Adds a specified number of hours to a time string and returns the new time in 12-hour format.
 *
 * @param {string} timeStr - The original time string in "HH:mm" format.
 * @param {number} hrsToAdd - The number of hours to add.
 * @returns {string} The new time in 12-hour format.
 */
const addHoursToTime = (timeStr, hrsToAdd) => {
  const [hourStr, minute] = timeStr.split(':');
  let newHour = (parseInt(hourStr, 10) + hrsToAdd) % 24;
  // Ensure the new hour is formatted as two digits if needed.
  const newTimeStr = `${newHour < 10 ? '0' + newHour : newHour}:${minute}`;
  return convertTo12Hour(newTimeStr);
};

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the "ScheduleFair" collection without ordering.
    const colRef = collection(db, 'ScheduleFair');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Sort the list on the frontend by converting the date and time into a Date object.
      const sortedList = list.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      });
      setSchedules(sortedList);
      setLoading(false);
    });
    // Cleanup the listener on unmount.
    return () => unsubscribe();
  }, []);

  // Filter schedules based on the company search term.
  const filteredSchedules = schedules.filter((schedule) =>
    schedule.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Checks if the current time is more than one hour past the event start time.
   *
   * @param {string} date - The event date in "YYYY-MM-DD" format.
   * @param {string} time - The event start time in "HH:mm" format.
   * @returns {boolean} True if more than one hour has passed since the event started.
   */
  const checkEventStatus = (date, time) => {
    const eventDateTime = new Date(`${date}T${time}`);
    const oneHourLater = new Date(eventDateTime.getTime() + 60 * 60 * 1000);
    const now = new Date();
    return now > oneHourLater;
  };

  // Show a loading indicator while data is being fetched.
  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh'
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Career Fair Schedule
      </Typography>
      <Typography variant="body1" gutterBottom>
              <strong>Venue:</strong> Main Auditorium Complex, University of Engineering & Technology (UET), Lahore
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
        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
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
                {/* Red dot indicator if event is past one hour from start */}
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
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No schedules found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
