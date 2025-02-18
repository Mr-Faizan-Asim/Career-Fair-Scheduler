// src/components/ScheduleForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Paper, Typography, Alert } from '@mui/material';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ScheduleForm({ schedule, clearSelection }) {
  const initialState = { company: '', eventType: 'interview', date: '', time: '', location: '' };
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if(schedule) {
      setFormData(schedule);
    } else {
      setFormData(initialState);
    }
  }, [schedule]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData.id) {
        // Update existing schedule
        const scheduleRef = doc(db, 'ScheduleFair', formData.id);
        await updateDoc(scheduleRef, formData);
        setMessage({ type: 'success', text: 'Schedule updated successfully!' });
      } else {
        // Add new schedule
        await addDoc(collection(db, 'ScheduleFair'), formData);
        setMessage({ type: 'success', text: 'Schedule added successfully!' });
      }
      setFormData(initialState);
      if(clearSelection) clearSelection();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {formData.id ? 'Edit Schedule' : 'Add New Schedule'}
      </Typography>
      {message.text && <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Event Type"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
            >
              <MenuItem value="interview">Interview</MenuItem>
              <MenuItem value="test">Test</MenuItem>
              <MenuItem value="workshop">Interview & Test</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="time"
              label="Time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location (Venue)"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {formData.id ? 'Update Schedule' : 'Add Schedule'}
            </Button>
            {formData.id && (
              <Button
                variant="outlined"
                sx={{ ml: 2 }}
                onClick={() => {
                  setFormData(initialState);
                  if (clearSelection) clearSelection();
                }}
              >
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
