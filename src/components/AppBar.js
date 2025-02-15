import { Link } from 'react-router-dom';
import { AppBar as MuiAppBar, Toolbar, Button } from '@mui/material';

export default function NavigationBar() {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/admin">Admin</Button>
      </Toolbar>
    </MuiAppBar>
  );
}