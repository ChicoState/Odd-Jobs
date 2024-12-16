import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, Typography, Button, Grid, Paper, CircularProgress, Alert, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';

const PageContainer = styled(Paper)({
  padding: '20px',
  maxWidth: '1000px',
  margin: 'auto',
  marginTop: '20px',
});

const FilterContainer = styled('div')({
  marginBottom: '20px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
});

const JobCard = styled(Card)({
  margin: '10px',
  width: '100%',
});

const TopRightButton = styled(Button)({ position: 'absolute', top: '20px', right: '20px', backgroundColor: '#828282', color: '#fff', '&:hover': {backgroundColor: '#828282',},});

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    minPay: '',
    maxPay: '',
    distance: '',
    time: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:5050/api/jobs?${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    fetchJobs();
  };

  const handlePickJob = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5050/api/jobs/${jobId}/pick`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: '12345' }), // Replace with the actual logged-in user ID
      });

      if (response.ok) {
        alert('Job picked successfully!');
        // Update job list to reflect the picked status
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId ? { ...job, picked: true } : job
          )
        );
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to pick job.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while picking the job.');
    }
  };

  return (
	  <>
	  <TopRightButton variant="contained" component={Link} to="/profile" startIcon={<HomeIcon />}>
	  Profile
	  </TopRightButton>
    <PageContainer>
      <Typography variant="h4" gutterBottom align="center">
        Job Postings
      </Typography>

      {/* Filter Section */}
      <FilterContainer>
        <TextField
          label="Date Posted After"
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Minimum Pay"
          type="number"
          name="minPay"
          value={filters.minPay}
          onChange={handleFilterChange}
        />
        <TextField
          label="Maximum Pay"
          type="number"
          name="maxPay"
          value={filters.maxPay}
          onChange={handleFilterChange}
        />
        <TextField
          label="Max Duration (hours)"
          type="number"
          name="time"
          value={filters.time}
          onChange={handleFilterChange}
        />
        <TextField
          label="Distance (miles)"
          type="number"
          name="distance"
          value={filters.distance}
          onChange={handleFilterChange}
        />
        <Button variant="contained" color="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </FilterContainer>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      )}
      {error && (
        <Alert severity="error" style={{ marginTop: '10px' }}>
          {error}
        </Alert>
      )}
      {!loading && !error && jobs.length === 0 && (
        <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
          No job postings found.
        </Typography>
      )}
      <Grid container spacing={2}>
        {jobs.map((job) => (
          <Grid item xs={12} key={job._id}>
            <JobCard>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography>{job.description}</Typography>
                <Typography><strong>Location:</strong> {job.location || 'N/A'}</Typography>
                <Typography><strong>Pay:</strong> ${job.pay}</Typography>
                <Typography><strong>Duration:</strong> {job.duration} hours</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePickJob(job._id)}
                  disabled={job.picked}
                  style={{ marginTop: '10px' }}
                >
                  {job.picked ? 'Already Picked' : 'Pick Job'}
                </Button>
              </CardContent>
            </JobCard>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
	  </>
  );
};

export default JobListPage;
