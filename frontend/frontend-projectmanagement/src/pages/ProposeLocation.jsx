import React, { useState, useEffect } from 'react';
import './ProposeLocation.css';
import axios from 'axios';

function ProposeLocation() {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    longitude: '',
    latitude: '',
    locationType: '',
    proposedBy: '',
    details: '',
  });
  const [editingLocationId, setEditingLocationId] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    const empId = localStorage.getItem('empId');  // Fetch empId
    if (empId) {
      setFormData((prevData) => ({ ...prevData, proposedBy: empId })); // Set in state
    }
    fetchLocations();  // Fetch initial locations
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api3/location');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLocationId) {
        // Update existing location
        await axios.put(`http://localhost:8081/api3/location/${editingLocationId}`, formData);
      } else {
        // Create new location
        await axios.post('http://localhost:8081/api3/location', formData);
      }
      fetchLocations(); // Refresh the list
      setFormData({ longitude: '', latitude: '', locationType: '', proposedBy: '', details: '' });
      setEditingLocationId(null); // Reset editing state
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const handleEdit = (location) => {
    setFormData({
      longitude: location.longitude,
      latitude: location.latitude,
      locationType: location.locationType,
      proposedBy: location.proposedBy,
      details: location.details,
    });
    setEditingLocationId(location.locationId);
  };

  return (
    <div className="propose-location-container">
      <div className="form-container">
        <h2>{editingLocationId ? 'Edit Location' : 'Propose a Location'}</h2>
        <form onSubmit={handleSubmit} className="location-form">
          <div className="form-group">
            <label>Longitude:</label>
            <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Latitude:</label>
            <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Location Type:</label>
            <select name="locationType" value={formData.locationType} onChange={handleChange} required>
              <option value="">Select Type</option>
              <option value="Urban">Urban</option>
              <option value="Rural">Rural</option>
              <option value="Suburban">Suburban</option>
            </select>
          </div>

          <div className="form-group">
            <input type="hidden" name="proposedBy" value={formData.proposedBy} />
          </div>

          <div className="form-group">
            <label>Details:</label>
            <textarea name="details" value={formData.details} onChange={handleChange} rows="4" required />
          </div>

          <button type="submit" className="submit-button">{editingLocationId ? 'Update' : 'Submit'}</button>
        </form>
      </div>

      <div className="table-container">
        <h3>Proposed Locations</h3>
        <table className="location-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Type</th>
              <th>Proposed By</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.locationId}>
                <td>{location.locationId}</td>
                <td>{location.longitude}</td>
                <td>{location.latitude}</td>
                <td>{location.locationType}</td>
                <td>{location.proposedBy}</td>
                <td>{location.details}</td>
                <td>
                  <button onClick={() => handleEdit(location)} className="edit-button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProposeLocation;
