// Profile.js
import * as React from 'react';
import { useState } from 'react';
import { Container, Typography, Button, Box, IconButton, Avatar } from '@mui/material'; // Importing Material-UI components
import { Link } from 'react-router';
import CreateIcon from '@mui/icons-material/Create';
import DoneIcon from '@mui/icons-material/Done';
import SearchIcon from '@mui/icons-material/Search';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Profile() {
  const [avatar, setAvatar] = useState("https://i.pinimg.com/736x/30/d6/9b/30d69bde48ab159ce326b65e21126347.jpg");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ backgroundImage: "url(https://miro.medium.com/v2/resize:fit:1200/1*b8WS2iEvZCQYlXq46gKpqw.jpeg)", backgroundSize: 'cover', backgroundRepeat: 'no-repeat',}}>
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', }}>
          <Avatar alt="Profile Picture" src={avatar} style={{ width: '120px', height: '120px', marginBottom: '10px', border: '2px solid white',}}/>
          <label htmlFor="upload-profile-picture" style={{ marginTop: '10px' }}>Upload Profile Picture</label>
          <input id="upload-profile-picture" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Box>
        <Box style={{ display: 'flex', gap: '20px', marginBottom: '20px', justifyContent: 'center',}}>
          <Button component={Link} to="/PostJobPage" variant="contained" color="primary" style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '8px',}}>
            <CreateIcon />
            Post a Job
          </Button>
          <Button component={Link} to="/acceptedjob" variant="contained" color="primary" style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '8px',}}>
            <DoneIcon />
            Accepted Jobs
          </Button>
        </Box>

        <Box style={{ display: 'flex', gap: '20px', marginBottom: '20px', justifyContent: 'center',}}>
          <Button component={Link} to="/JobListPage" variant="contained" color="primary" style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '8px',}}>
            <SearchIcon />
            View Job Listing
          </Button>
          <Button component={Link} to="/pastworkershistory" variant="contained" color="primary" style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '8px',}}>
            <WorkHistoryIcon />
            Past Workers History
          </Button>
        </Box>
        <IconButton component={Link} to="/" color="primary" style={{ marginTop: '20px' }}> 
          <LogoutIcon />
          <Typography variant="body1" style={{ marginLeft: '8px' }}>
            Logout
          </Typography>
        </IconButton>
      </Container>
    </div>
  );
}
