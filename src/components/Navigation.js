// src/components/Navigation.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            2025 UET CAREER FAIR
          </Typography>
          <Button color="inherit" component={Link} to="/">Schedule</Button>
          <Button color="inherit" component={Link} to="/details">Details</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
