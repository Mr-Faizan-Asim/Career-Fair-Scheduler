// src/components/Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ textAlign: 'center', p: 2, backgroundColor: '#002147', color: 'white' }}>
      <Typography variant="body2">
        &copy;UET CAREER FAIR. All rights reserved. Developed by{' '}
        <Link
          href="https://www.linkedin.com/in/muhammad-faizan-asim/"
          target="_blank"
          rel="noopener"
          sx={{ color: '#FDB913', textDecoration: 'underline' }}
        >
          Muhammad Faizan Asim
        </Link>.
      </Typography>
    </Box>
  );
}
