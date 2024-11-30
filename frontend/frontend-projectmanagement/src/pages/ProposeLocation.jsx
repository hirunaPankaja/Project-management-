import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProposeLocation.css';
import SmallTile from '../components/SmallTile';

function ProposeLocation() {
  const [locations, setLocations] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [formData, setFormData] = useState({
    longitude: '',
    latitude: '',
    locationType: '',
    proposedBy: '',
    details: '',
    outletName: '',
    profitStatus: ''
  });
  const [editingLocationId, setEditingLocationId] = useState(null);
  const [editingOutletId, setEditingOutletId] = useState(null);
  const [activeForm, setActiveForm] = useState('location'); // Track the active form ('location' or 'outlet')

  // Fetch locations and outlets
  useEffect(() => {
    fetchLocations();
    fetchOutlets();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api3/location');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchOutlets = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api3/outletlocation');
      setOutlets(response.data);
    } catch (error) {
      console.error('Error fetching outlets:', error);
    }
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for both location and outlet
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const parsedData = {
      ...formData,
      longitude: parseFloat(formData.longitude),
      latitude: parseFloat(formData.latitude),
    };

    try {
      if (activeForm === 'location') {
        if (editingLocationId) {
          await axios.put(`http://localhost:8081/api3/location/${editingLocationId}`, parsedData);
        } else {
          await axios.post('http://localhost:8081/api3/location', parsedData);
        }
        fetchLocations();
      } else if (activeForm === 'outlet') {
        if (editingOutletId) {
          await axios.put(`http://localhost:8081/api3/outletlocation/${editingOutletId}`, parsedData);
        } else {
          await axios.post('http://localhost:8081/api3/outletlocation', parsedData);
        }
        fetchOutlets();
      }

      setFormData({
        longitude: '',
        latitude: '',
        locationType: '',
        proposedBy: '',
        details: '',
        outletName: '',
        profitStatus: ''
      });
      setEditingLocationId(null);
      setEditingOutletId(null);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Handle editing
  const handleEdit = (item, type) => {
    if (type === 'location') {
      setFormData({
        longitude: item.longitude,
        latitude: item.latitude,
        locationType: item.locationType,
        proposedBy: item.proposedBy,
        details: item.details,
        outletName: '',
        profitStatus: ''
      });
      setEditingLocationId(item.locationId);
      setActiveForm('location');
    } else {
      setFormData({
        longitude: item.longitude,
        latitude: item.latitude,
        locationType: '',
        proposedBy: '',
        details: '',
        outletName: item.outletName,
        profitStatus: item.profitStatus
      });
      setEditingOutletId(item.outletLocationId);
      setActiveForm('outlet');
    }
  };

  return (
    <div className="propose-location-container">
      {/* Tiles for Switching between Forms */}
      <div className="small-tiles-containers">
        <SmallTile 
          tile={{ name: 'Propose Location', icon: 'location_on', color: '#5BC0EB' }} 
          onClick={() => setActiveForm('location')} 
        />
        <SmallTile 
          tile={{ name: 'Register Outlet', icon: 'store', color: '#F7B2AD' }} 
          onClick={() => setActiveForm('outlet')} 
        />
      </div>

      {/* Form */}
      <div className="form-container">
        <h2>{activeForm === 'location' ? (editingLocationId ? 'Edit Location' : 'Propose a Location') : (editingOutletId ? 'Edit Outlet' : 'Register an Outlet')}</h2>
        <form onSubmit={handleSubmit} className="location-form">
          <div className="form-group">
            <label>Longitude:</label>
            <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Latitude:</label>
            <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
          </div>

          {activeForm === 'location' && (
            <>
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
                <label>Details:</label>
                <textarea name="details" value={formData.details} onChange={handleChange} rows="4" required />
              </div>
            </>
          )}

          {activeForm === 'outlet' && (
            <>
              <div className="form-group">
                <label>Outlet Name:</label>
                <input type="text" name="outletName" value={formData.outletName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Profit Status:</label>
                <select name="profitStatus" value={formData.profitStatus} onChange={handleChange} required>
                  <option value="">Select Status</option>
                  <option value="Profitable">Profitable</option>
                  <option value="Not Profitable">Not Profitable</option>
                </select>
              </div>
            </>
          )}

          <button type="submit" className="submit-button">{activeForm === 'location' ? (editingLocationId ? 'Update' : 'Submit') : (editingOutletId ? 'Update' : 'Submit')}</button>
        </form>
      </div>

      {/* Table for Locations */}
      {activeForm === 'location' && (
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
                    <button onClick={() => handleEdit(location, 'location')} className="edit-button">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Table for Outlets */}
      {activeForm === 'outlet' && (
        <div className="table-container">
          <h3>Outlet Locations</h3>
          <table className="location-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Outlet Name</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Profit Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {outlets.map((outlet) => (
                <tr key={outlet.outletLocationId}>
                  <td>{outlet.outletLocationId}</td>
                  <td>{outlet.outletName}</td>
                  <td>{outlet.longitude}</td>
                  <td>{outlet.latitude}</td>
                  <td>{outlet.profitStatus}</td>
                  <td>
                    <button onClick={() => handleEdit(outlet, 'outlet')} className="edit-button">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProposeLocation;
