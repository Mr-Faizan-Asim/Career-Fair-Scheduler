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
 * Adds a specified number of hours (which can be fractional) to a time string and returns the new time in 12-hour format.
 *
 * @param {string} timeStr - The original time string in "HH:mm" format.
 * @param {number} hrsToAdd - The number of hours to add (can be fractional, e.g., 2.75).
 * @returns {string} The new time in 12-hour format.
 */
const addHoursToTime = (timeStr, hrsToAdd) => {
  // Convert the fractional hours to total minutes.
  const totalMinutesToAdd = Math.round(hrsToAdd * 60);
  const [hourStr, minuteStr] = timeStr.split(':');
  // Create a date object (the date part is arbitrary).
  const initialDate = new Date(2000, 0, 1, parseInt(hourStr, 10), parseInt(minuteStr, 10));
  // Add the minutes.
  initialDate.setMinutes(initialDate.getMinutes() + totalMinutesToAdd);
  const newHour = initialDate.getHours();
  const newMinute = initialDate.getMinutes();
  // Format the time string ensuring two digits for hours and minutes.
  const newTimeStr = `${newHour < 10 ? '0' + newHour : newHour}:${newMinute < 10 ? '0' + newMinute : newMinute}`;
  return convertTo12Hour(newTimeStr);
};

/**
 * Checks if the current time is more than 2 hours and 45 minutes past the event start time.
 *
 * @param {string} date - The event date in "YYYY-MM-DD" format.
 * @param {string} time - The event start time in "HH:mm" format.
 * @returns {boolean} True if the current time is past the event's end time.
 */
const checkEventStatus = (date, time) => {
  // Parse the event start time.
  const eventDateTime = new Date(`${date}T${time}`);
  // Calculate event end time by adding 2 hours and 45 minutes (165 minutes).
  const eventDurationMinutes = 165;
  const eventEndTime = new Date(eventDateTime.getTime() + eventDurationMinutes * 60 * 1000);
  const now = new Date();
  return now > eventEndTime;
};

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the "ScheduleFair" collection.
    const colRef = collection(db, 'ScheduleFair');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Sort the list by converting the date and time into a Date object.
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
      <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
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
                {/* Red dot indicator if event is past the end time (2 hours 45 minutes after start) */}
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
                    {addHoursToTime(schedule.time, 2.75)}
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
