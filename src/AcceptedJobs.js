import React, { useState, useEffect } from 'react';

// Sample data for accepted jobs
const initialJobs = [
  { id: 1, name: 'Fix plumbing', dueDate: '2024-10-15', priority: 'high' },
  { id: 2, name: 'Paint house', dueDate: '2024-10-20', priority: 'medium' },
  { id: 3, name: 'Garden work', dueDate: '2024-10-12', priority: 'low' },
];

const AcceptedJobs = () => {
  const [jobs, setJobs] = useState([]);

  // Sort jobs by urgency (earliest due date first)
  useEffect(() => {
    const sortedJobs = [...initialJobs].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    setJobs(sortedJobs);
  }, []);

  // Function to determine the urgency level
  const getUrgencyColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <div>
      <h1>Accepted Jobs</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} style={{ color: getUrgencyColor(job.priority) }}>
            <h2>{job.name}</h2>
            <p>Due Date: {new Date(job.dueDate).toLocaleDateString()}</p>
            <p>Priority: {job.priority}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcceptedJobs;
