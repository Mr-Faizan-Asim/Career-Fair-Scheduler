// src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, List, ListItem, ListItemText, Divider, Typography, Button, Paper } from '@mui/material';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ScheduleForm from './ScheduleForm';
import AdminLogin from './AdminLogin';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = onSnapshot(collection(db, 'ScheduleFair'), (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSchedules(list);
      });
      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      await deleteDoc(doc(db, 'ScheduleFair', id));
      setSelectedSchedule(null);
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel – Manage Schedules
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ maxHeight: 500, overflow: 'auto', p: 2 }}>
            <List>
              {schedules.map(schedule => (
                <React.Fragment key={schedule.id}>
                  <ListItem button onClick={() => setSelectedSchedule(schedule)}>
                    <ListItemText
                      primary={`${schedule.company} (${schedule.eventType})`}
                      secondary={`${schedule.date} at ${schedule.time}`}
                    />
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={(e) => { e.stopPropagation(); handleDelete(schedule.id); }}
                    >
                      Delete
                    </Button>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <ScheduleForm schedule={selectedSchedule} clearSelection={() => setSelectedSchedule(null)} />
        </Grid>
      </Grid>
    </Container>
  );
}
