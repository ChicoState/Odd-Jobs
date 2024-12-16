import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import './AcceptedJobs.css';
import { Link } from 'react-router';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const containerStyle = {
  width: '100%',
  height: '450px' //height for map
};

const defaultCenter = { lat: 39.7283, lng: -121.8380 }; //center of chico

//func for marker color
const getMarkerIcon = (priority) => {
  const baseIconUrl = 'http://maps.google.com/mapfiles/ms/icons/';
  switch (priority) {
    case 'high':
      return { url: baseIconUrl + 'red-dot.png', scaledSize: new window.google.maps.Size(32, 32) };
    case 'medium':
      return { url: baseIconUrl + 'yellow-dot.png', scaledSize: new window.google.maps.Size(32, 32) };
    case 'low':
      return { url: baseIconUrl + 'green-dot.png', scaledSize: new window.google.maps.Size(32, 32) };
    default:
      return { url: baseIconUrl + 'blue-dot.png', scaledSize: new window.google.maps.Size(32, 32) };
  }
};

//entire function for running acceptedjobs page
const AcceptedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState('all');  //stores current filter selected
  const [mapLoaded, setMapLoaded] = useState(false);  //state to track if map API is loaded, need before color markers


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => filter === 'all' || job.priority === filter);

  const handleMarkerClick = (job) => {
    setSelectedJob(job); //update selected job in list to the clicked marker
  };

  return (
	  <div style={{ position: 'relative', padding: '20px' }}>
	  <Button variant="contained" color="primary" component={Link} to="/profile" startIcon={<HomeIcon />} style={{position: 'absolute', top: '20px', right: '10px',backgroundColor: '#828282', color: '#fff',}}>
	  Home
	  </Button>

    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // Key in .env
      onLoad={() => setMapLoaded(true)}
    >
      <div className="container">
        <div className="topSection">
          <div className="filterBox">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Urgencies</option>
              <option value="high">High Urgency</option>
              <option value="medium">Medium Urgency</option>
              <option value="low">Low Urgency</option>
            </select>
          </div>
          <div className="jobList">
            <h1>Accepted Jobs</h1>
            <ul>
              {filteredJobs.map((job) => (
                <li key={job._id} onClick={() => setSelectedJob(job)}>
                  {job.title}
                </li>
              ))}
            </ul>
          </div>
          {mapLoaded && (
            <div className="mapContainer">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedJob?.coordinates || defaultCenter}
                zoom={12}
              >
                {filteredJobs.map((job) =>
                  job.coordinates ? (
                    <MarkerF
                      key={job._id}
                      position={{
                        lat: parseFloat(job.coordinates.lat),
                        lng: parseFloat(job.coordinates.lng),
                      }}
                      icon={getMarkerIcon(job.priority)}
                      onClick={() => handleMarkerClick(job)}
                    />
                  ) : null
                )}
                {selectedJob && selectedJob.coordinates && (
                  <InfoWindowF
                    position={{
                      lat: parseFloat(selectedJob.coordinates.lat),
                      lng: parseFloat(selectedJob.coordinates.lng),
                    }}
                    onCloseClick={() => setSelectedJob(null)}
                  >
                    <div>
                      <h3>{selectedJob.title}</h3>
                      <p>Due: {new Date(selectedJob.dueDate).toLocaleDateString()}</p>
                      <p>Priority: {selectedJob.priority}</p>
                    </div>
                  </InfoWindowF>
                )}
              </GoogleMap>
            </div>
          )}
        </div>
        {selectedJob && (
          <div className="jobDetails">
            <h2>Details for {selectedJob.title}</h2>
            <p>Description: {selectedJob.description || 'No description provided.'}</p>
            <p>Due: {new Date(selectedJob.dueDate).toLocaleDateString()}</p>
            <p>Priority: {selectedJob.priority}</p>
          </div>
        )}
      </div>
    </LoadScript>
	  </div>
  );
}; 

export default AcceptedJobs;
