import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { Button, Container, TextField, Typography, Grid } from '@mui/material';

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: `${name} ${lastname}`,
          email,
          password,
          phone: phoneNumber,
          isStudent: false
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Account created:', data);
      alert("Account successfully created!");
      navigate('/'); // Use navigate instead of history.push

    } catch (error) {
      console.error("Error creating account:", error);
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Create your Odd Jobs Account
      </Typography>
      <form onSubmit={handleCreateAccount} style={{ width: '100%', maxWidth: '400px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Lastname"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Grid>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Phone Number"
          type="tel"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Typography variant="body2" style={{ margin: '10px' }}>
          Use 8 or more characters with a mix of letters, numbers & symbols
        </Typography>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={6}>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Sign in instead{' '}
              <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>
                login
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <Button variant="contained" color="primary" type="submit">
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
