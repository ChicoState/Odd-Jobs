import React, { useState } from 'react'; // Import useState
import { Link } from 'react-router';
import { Button, Container, TextField, Typography } from '@mui/material'; // Import Material-UI components
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import logo from './images/logo.png';

const Card = styled(MuiCard)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: 'auto',
	backgroundColor: '#e5e5e5',
	[theme.breakpoints.up('sm')]: { maxWidth: '450px', },
	boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
	...theme.applyStyles('dark', { boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px', }),
}));


function Login() {
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent form submission
    // You can add your login logic here
    console.log('Username:', username, 'Password:', password);
  };

  return (
	  <div style={{ backgroundImage: "url(https://miro.medium.com/v2/resize:fit:1200/1*b8WS2iEvZCQYlXq46gKpqw.jpeg)", backgroundSize: 'cover', backgroundRepeat: 'no-repeat',}}>

    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column', // Align items in a column
        height: '100vh', // Full viewport height
      }}
    >
	  <Card variant="outlined">
	  <img src={logo} alt="Odd Jobs Logo" component="h1" variant="h6" sx={{ width: '100%', fontSize: 'clamp(1rem, 2vw, 1.15rem)', textAlign: 'center', fontWeight: 'normal' }}/>

     <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center', fontWeight: 'normal' }}>
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
        <Link to="/Profile" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Link>
	</form>
	 {/*END OF LOGIN*/}

	 {/*Link to navigate to the CreateAccount page*/}
	 <Typography variant="body2" style={{ marginTop: '10px' }}>
	  	Don't have an account?{' '}
	 <Link to="/CreateAccount" style={{ textDecoration: 'underline', color: 'blue' }}>
		Sign Up
	 </Link>
	 </Typography>
	{/*END OF CREATE ACCOUNT*/}
	</Card>
    </Container>
	</div>
  );
}

export default Login;
