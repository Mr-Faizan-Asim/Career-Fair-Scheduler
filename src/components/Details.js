// src/pages/Details.js
import React from 'react';
import { 
  Container, Typography, Box, Divider, Paper, 
  List, ListItem, ListItemIcon, ListItemText 
} from '@mui/material';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: 'easeOut' }
  },
};

export default function Details() {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          🌟 UET CAREER FAIR 2025 🌟
        </Typography>
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Engineering of Thy Lord Who Creates
        </Typography>
        <Divider sx={{ my: 3 }} />
        
        {/* Basic Event Details */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body1" gutterBottom>
              <strong>Date:</strong> 9th April 2025
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Time:</strong> 9:00 AM - 4:30 PM
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Venue:</strong> Main Auditorium Complex, University of Engineering & Technology (UET), Lahore
            </Typography>
          </Box>
        </Paper>
        
        {/* Event Information */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="body1" paragraph>
            UET Career Fair 2025 is set to be a grand event where students, alumni, and industry professionals come together for recruitment and career opportunities. This is an amazing chance for you to explore potential employers and job openings across 50+ fields.
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Event Highlights */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              🔹 Event Highlights:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <StarIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="15k+ Students & Alumni Visitors" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <StarIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="190+ Industrial Stalls" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <StarIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Recruitment Opportunities in 50+ Fields" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <StarIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Industries & Companies Represented: HR Firms, Service Providers, IT & Telecom, Education Consultants, Trade Associations, Manufacturers, Brands, and more." 
                />
              </ListItem>
            </List>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Participation Details */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              🔹 Who Can Participate:
            </Typography>
            <Typography variant="body1" paragraph>
              Industries, Manufacturers, Brands, HR Firms, Service Providers, Education Consultants, IT & Telecom, Trade Associations, and Businesses.
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body1" paragraph>
            🔹 Don't miss out on this opportunity to explore exciting career paths and network with top employers!
          </Typography>
        </Paper>
      </Container>
    </motion.div>
  );
}
