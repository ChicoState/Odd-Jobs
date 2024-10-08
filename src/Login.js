import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@mui/material'; // Import Material-UI components

function Login() {
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent form submission
    // You can add your login logic here
    console.log('Username:', username, 'Password:', password);
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // Align items in a column
        height: '100vh', // Full viewport height
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to Odd Jobs
      </Typography>
      <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        {/* Link to navigate to the Forum page */}
        <Link to="/forum" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Link>
      </form>
    </Container>
  );
}

export default Login;
