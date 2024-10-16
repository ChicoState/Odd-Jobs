import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './Login';
import Forum from './Forum';
import AcceptedJobs from './AcceptedJobs';

function App() {
  const [open, setOpen] = React.useState(false); // state to control the drawer

  // Function to toggle the drawer
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
    console.log(open);
  };
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          {/* Icon button to open the drawer */}
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Menu</Typography>
        </Toolbar>
      </AppBar>


      {/* Drawer component */}
      <Drawer open={open} onClose={toggleDrawer}>
        <List>
          {/* Links to navigate to different routes */}
          <ListItem button component={Link} to="/forum" onClick={toggleDrawer}>
            <ListItemText primary="Forum" />
          </ListItem>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={Link} to="/acceptedjob" onClick={toggleDrawer}>
            <ListItemText primary="AcceptedJobs" />
          </ListItem>
        </List>
      </Drawer>



      {/* Routes for teh application */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/acceptedjob" element={<AcceptedJobs />} />
      </Routes>
    </Router>
  );
}


export default App;
