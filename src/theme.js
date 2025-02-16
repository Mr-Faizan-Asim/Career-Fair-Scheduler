// src/theme.js
import { createTheme } from '@mui/material/styles';

// UET Lahore-inspired color palette
// Primary: Navy Blue (#002147)
// Secondary: Gold (#FDB913)
const theme = createTheme({
  palette: {
    primary: { main: '#002147' },
    secondary: { main: '#FDB913' },
    error: { main: '#d32f2f' },
    background: { default: '#f4f6f8', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
