import React, { useState } from 'react';
import { TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Alert } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Paper)({
  padding: '20px',
  maxWidth: '600px',
  margin: 'auto',
  marginTop: '20px',
  textAlign: 'center',
});

const ImagePreviewContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: '10px',
});

const ImagePreview = styled('img')({
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '8px',
  margin: '5px',
});

const PostJobPage = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    pay: '',
    duration: '',
    photos: [],
  });

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);

    // Check if adding these files exceeds the limit of 5
    if (files.length + jobData.photos.length > 5) {
      setError("You can upload a maximum of 5 photos.");
      return;
    }

    setError(null); // Clear any previous error
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setJobData((prevData) => ({ ...prevData, photos: [...prevData.photos, ...filePreviews] }));
  };

  const handleOpenReview = () => setReviewDialogOpen(true);
  const handleCloseReview = () => setReviewDialogOpen(false);

  const handleConfirmSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/jobs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });
  
      if (response.ok) {
        alert("Job posted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error posting job:", errorData);
        alert("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred while posting the job.");
    } finally {
      setReviewDialogOpen(false);
    }
  };
  

  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom align="center">Post a Job</Typography>
      
      <TextField
        fullWidth
        label="Job Title"
        name="title"
        value={jobData.title}
        onChange={handleChange}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Description"
        name="description"
        multiline
        rows={4}
        value={jobData.description}
        onChange={handleChange}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Location (Specific Address or Landmark)"
        name="location"
        value={jobData.location}
        onChange={handleChange}
        margin="normal"
      />
      
      <TextField
        fullWidth
        label="Pay (in USD)"
        name="pay"
        type="number"
        value={jobData.pay}
        onChange={handleChange}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Estimated Duration (in hours)"
        name="duration"
        type="number"
        value={jobData.duration}
        onChange={handleChange}
        margin="normal"
        required
      />

      <Button
        variant="contained"
        component="label"
        style={{ marginTop: '10px' }}
      >
        Upload Photos (Optional)
        <input
          type="file"
          hidden
          multiple
          onChange={handlePhotoUpload}
        />
      </Button>

      {/* Error Message */}
      {error && (
        <Alert severity="error" style={{ marginTop: '10px' }}>
          {error}
        </Alert>
      )}

      {/* Photo Preview Section */}
      <ImagePreviewContainer>
        {jobData.photos.map((photo, index) => (
          <ImagePreview key={index} src={photo} alt={`Preview ${index + 1}`} />
        ))}
      </ImagePreviewContainer>

      <div style={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenReview}
          disabled={!jobData.title || !jobData.description || !jobData.pay || !jobData.duration}
        >
          Submit Job
        </Button>
      </div>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onClose={handleCloseReview}>
        <DialogTitle>Review Your Job Post</DialogTitle>
        <DialogContent>
          <Typography><strong>Title:</strong> {jobData.title}</Typography>
          <Typography><strong>Description:</strong> {jobData.description}</Typography>
          <Typography><strong>Location:</strong> {jobData.location || 'N/A'}</Typography>
          <Typography><strong>Pay:</strong> ${jobData.pay}</Typography>
          <Typography><strong>Duration:</strong> {jobData.duration} hours</Typography>
          {jobData.photos.length > 0 && (
            <>
              <Typography><strong>Photos:</strong></Typography>
              <ImagePreviewContainer>
                {jobData.photos.map((photo, index) => (
                  <ImagePreview key={index} src={photo} alt={`Preview ${index + 1}`} />
                ))}
              </ImagePreviewContainer>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReview} color="secondary">Edit</Button>
          <Button onClick={handleConfirmSubmit} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </FormContainer>
  );
};

export default PostJobPage;
