import React, { useState, useEffect } from 'react';
import './PastWorkersHistory.css';  // Make sure to import the CSS

// Sample data for past workers
const initialWorkers = [
  { id: 1, name: 'John Doe', job: 'Fix plumbing', completionDate: '2024-09-15', rating: 4.5 },
  { id: 2, name: 'Jane Smith', job: 'Paint house', completionDate: '2024-08-20', rating: 4.7 },
  { id: 3, name: 'Bob Johnson', job: 'Garden work', completionDate: '2024-07-12', rating: 4.0 },
];

const PastWorkersHistory = () => {
  const [workers, setWorkers] = useState([]);

  // Sort workers by most recent completion date
  useEffect(() => {
    const sortedWorkers = [...initialWorkers].sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate));
    setWorkers(sortedWorkers);
  }, []);

  const handleClick = (worker) => {
    alert(`You clicked on ${worker.name}!`);
    // Implement your own logic, like navigating to a detail page
  };

  return (
    <div className="container">
      <h1>Past Workers History</h1>
      <div className="cards-container">
        {workers.map((worker) => (
          <div key={worker.id} className="worker-card" onClick={() => handleClick(worker)}>
            <h2>{worker.name}</h2>
            <p>Job: {worker.job}</p>
            <p>Completion Date: {new Date(worker.completionDate).toLocaleDateString()}</p>
            <p>Rating: {worker.rating} / 5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastWorkersHistory;
