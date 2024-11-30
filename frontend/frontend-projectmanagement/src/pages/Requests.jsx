import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Requests.css';

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests data from API
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="requests-container">
      <h2>Engineer Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul>
          {requests.map((request, index) => (
            <li key={index}>{request.description}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Requests;
