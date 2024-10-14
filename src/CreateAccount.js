// CreateAccount.js
import React, { useState } from 'react'; // Import useState
//import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, TextField, Typography, Grid } from '@mui/material'; // Import Material-UI components

export default function CreateAccount() {
	const [name, setName] = useState(''); // State for username input
	const [lastname, setLastName] = useState(''); // State for password input
	const [email, setEmail] = useState(''); // State for email input
	const [password, setPassword] = useState('');//State for password
	const [confirmpassword, setConfirmPassword] = useState(''); //State for confirmpassword
	const [phonenumber, setPhoneNumber] = useState(''); //State for phonenumber

        const handleLogin = (event) => {
        event.preventDefault(); // Prevent form submission
        console.log('Name:', name, 'Lastname:', lastname, 'Email:', email,'PhoneNumber',phonenumber, 'Password:', password, 'Confirm Password', confirmpassword);
        };

  return (
 	<Container
		style={{
        	display: 'flex', // Flexbox for layout
        	flexDirection: 'column', // Stack items vertically
        	justifyContent: 'center', // Center vertically
        	alignItems: 'center', // Center horizontally
        	height: '100vh', // Full viewport height
        	}}
	 > 
	 <Typography variant="h4" gutterBottom>
	  Create your Odd Jobs Account
	 </Typography>
         <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px' }}>
	 <Grid container spacing={2}>
	 <Grid item xs={6}>
         <TextField
	 	label="Name"
         	type="Name"
	  	variant="outlined"
	  	fullWidth
          	margin="normal"
	  	value={name}
          	onChange={(e) => setName(e.target.value)} // Update name state
    	 />
	  </Grid>
	  <Grid item xs={6}>
         <TextField
	 	label="Lastname"
	  	type="Lastname"
	  	variant="outlined"
	 	fullWidth
	  	margin="normal"
	  	value={lastname}
	  	onchange={(e) => setLastName(e.target.value)} //Update lastname state
    	 />
	  </Grid>
	  </Grid>
         <TextField
          	label="Email"
	  	type="Email"
          	variant="outlined"
	  	fullWidth
	  	margin="normal"
          	value={email}
	  	onchange={(e) => setEmail(e.target.value)} //Update lastname state
   	 />
	 <TextField
	  	label="PhoneNumber"
	  	type="PhoneNumber"
	  	variant="outlined"
	  	fullWidth
	  	margin="normal"
	  	value={phonenumber}
	  	onchange={(e) => setPhoneNumber(e.target.value)} //Update phonenumber state
	 />
	 <Grid container spacing={2}>
	 <Grid item xs={6}>
	 <TextField
	  	label="Password"
	  	type="Password"
	  	variant="outlined"
	  	fullWidth
	  	margin="normal"
	  	value={password}
	  	onChange={(e) => setPassword(e.target.value)} //Update password state
	  />
	  </Grid>
	  <Grid item xs={6}>
	  <TextField
	 	label="Confirm Password"
	  	type="Confrim Password"
	  	variant="outlined"
	  	fullWidth
	  	margin="normal"
	  	value={confirmpassword}
	  	onChange={(e) => setConfirmPassword(e.target.value)} //Update password state
	  />
	  </Grid>
	  </Grid>
	 <Typography variant="body2" style={{ margin: '10px'}}>
	  Use 8 or more characters with a mix of letters, numbers & sybols{' '}
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
