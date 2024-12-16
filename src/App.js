import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './Login';
import Forum from './Forum';
import Profile from './Profile';
import AcceptedJobs from './AcceptedJobs';
import CreateAccount from './CreateAccount';
import PastWorkersHistory from './PastWorkersHistory';
import PostJobPage from './PostJobPage';
import JobListPage from './JobListPage';

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
          <IconButton aria-label="menu" edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Menu</Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer component */}
      <Drawer open={open} onClose={toggleDrawer}>
        <List>
          {/* Links to navigate to different routes */}
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={Link} to="/CreateAccount" onClick={toggleDrawer}>
            <ListItemText primary="Create Account" />
          </ListItem>
	  <ListItem button component={Link} to="/Profile" onClick={toggleDrawer}>
       	    <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/PostJobPage" onClick={toggleDrawer}>
            <ListItemText primary="Post a Job" />
          </ListItem>
          <ListItem button component={Link} to="/JobListPage" onClick={toggleDrawer}>
            <ListItemText primary="View Job Listing" />
          </ListItem>
          <ListItem button component={Link} to="/forum" onClick={toggleDrawer}>
            <ListItemText primary="Forum" />
          </ListItem>
          <ListItem button component={Link} to="/acceptedjob" onClick={toggleDrawer}>
            <ListItemText primary="Accepted Jobs" />
          </ListItem>
          <ListItem button component={Link} to="/pastworkershistory" onClick={toggleDrawer}>
            <ListItemText primary="Past Workers History" />
          </ListItem>
        </List>
      </Drawer>

      {/* Routes for the application */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/PostJobPage" element={<PostJobPage />} />
        <Route path="/JobListPage" element={<JobListPage />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/acceptedjob" element={<AcceptedJobs />} />
        <Route path="/pastworkershistory" element={<PastWorkersHistory />} />
	  <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
