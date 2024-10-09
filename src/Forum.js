// Forum.js
import * as React from 'react';
import { Box, TextField, Button } from '@mui/material'; // Importing Material-UI components

export default function Forum() {
  const [inputValue, setInputValue] = React.useState(''); // State to manage input value

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log(inputValue); // Log the input value or handle it as needed
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit} // Handle form submission
      sx={{
        display: 'flex', // Flexbox for layout
        flexDirection: 'column', // Stack items vertically
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        height: '100vh', // Full viewport height
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Forum Us</h1>
      <TextField
        id="outlined-multiline-flexible"
        label="What do you need help with?"
        multiline
        maxRows={16}
        variant="outlined"
        value={inputValue} // Bind the input value to state
        onChange={(e) => setInputValue(e.target.value)} // Update state on input change
        sx={{ width: '300px', mb: 2 }} // Custom width and margin bottom for spacing
      />
      {/* Submit button positioned below the text box */}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}
