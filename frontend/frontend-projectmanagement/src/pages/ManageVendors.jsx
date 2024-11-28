import React, { useEffect, useState } from 'react';
import SmallTile from '../components/SmallTile';
import { FaEdit, FaTrashAlt, FaEye, FaPlus, FaTimes } from 'react-icons/fa'; // Import icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageVendors() {
  const [vendors, setVendors] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const [vendorToUpdate, setVendorToUpdate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: '',
    charge: '',
  });
  const [loading, setLoading] = useState(false);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:8081/api2/vendor');
        const data = await response.json();
        if (Array.isArray(data)) {
          setVendors(data);
        } else {
          console.error('Expected an array of vendors');
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
        toast.error('Error fetching vendors');
      }
    };
    fetchVendors();
  }, []);

  // Handle Add Vendor
  const handleAddVendor = async () => {
    // Check if the vendors array is empty
    let newId = 'VEN0001'; // Default value if no vendors exist
    if (vendors.length > 0) {
      // Get the last vendor and calculate the next ID
      const lastVendor = vendors[vendors.length - 1];
      newId = `VEN${(parseInt(lastVendor.vendorId.replace('VEN', '')) + 1).toString().padStart(4, '0')}`;
    }

    const newVendor = {
      vendorId: newId,
      name: formData.name,
      phone: formData.phone,
      type: formData.type,
      charge: formData.charge,
    };

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8081/api2/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVendor),
      });

      const addedVendor = await response.json();
      setVendors((prevVendors) => [...prevVendors, addedVendor]);
      setFormData({ name: '', phone: '', type: '', charge: '' }); // Clear fields
      toast.success('Vendor added successfully!');
    } catch (error) {
      console.error('Error adding vendor:', error);
      toast.error('Error adding vendor');
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete Vendor with confirmation
  const handleDeleteVendor = async (vendorId) => {
    const confirmed = window.confirm('Are you sure you want to delete this vendor?');
    if (confirmed) {
      try {
        await fetch(`http://localhost:8081/api2/${vendorId}`, { method: 'DELETE' });
        setVendors(vendors.filter((vendor) => vendor.vendorId !== vendorId));
        toast.success('Vendor deleted successfully!');
      } catch (error) {
        console.error('Error deleting vendor:', error);
        toast.error('Error deleting vendor');
      }
    }
  };

  // Handle Update Vendor
  const handleUpdateVendor = async () => {
    try {
      const updatedVendor = {
        vendorId: vendorToUpdate.vendorId, // Keep the original vendorId
        name: formData.name,
        phone: formData.phone,
        type: formData.type,
        charge: formData.charge,
      };

      const response = await fetch(`http://localhost:8081/api2/${vendorToUpdate.vendorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVendor),
      });

      const updatedData = await response.json();
      setVendors(
        vendors.map((vendor) =>
          vendor.vendorId === vendorToUpdate.vendorId ? { ...vendor, ...updatedData } : vendor
        )
      );
      setVendorToUpdate(null);
      setFormData({ name: '', phone: '', type: '', charge: '' }); // Clear fields
      toast.success('Vendor updated successfully!');
    } catch (error) {
      console.error('Error updating vendor:', error);
      toast.error('Error updating vendor');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // When a vendor is selected for update, populate the form
  useEffect(() => {
    if (vendorToUpdate) {
      setFormData({
        name: vendorToUpdate.name,
        phone: vendorToUpdate.phone,
        type: vendorToUpdate.type,
        charge: vendorToUpdate.charge,
      });
    }
  }, [vendorToUpdate]);

  // Render the Vendor Table
  const renderViewTable = () => (
    <table className="vendor-table">
      <thead>
        <tr>
          <th>Vendor ID</th>
          <th>Name</th>
          <th>Contact</th>
          <th>Type</th>
          <th>Charge</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {vendors.map((vendor) => (
          <tr key={vendor.vendorId}>
            <td>{vendor.vendorId}</td>
            <td>{vendor.name}</td>
            <td>{vendor.phone}</td>
            <td>{vendor.type}</td>
            <td>{vendor.charge}</td>
            <td>
              <button onClick={() => setVendorToUpdate(vendor)} className="update-button">
                <FaEdit /> Update
              </button>
              <button onClick={() => handleDeleteVendor(vendor.vendorId)} className="delete-button">
                <FaTimes /> Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Render the Register Form
  const renderRegisterForm = () => (
    <form
      className="register-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddVendor();
      }}
    >
      <h2>Register New Vendor</h2>
    
      <label>
        Vendor Name:
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Contact:
        <input
          type="text"
          name="phone"
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          name="type"
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Day Charge:
        <input
          type="text"
          name="charge"
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        <FaPlus /> Register Vendor
      </button>
    </form>
  );

  // Render the Update Form
  const renderUpdateForm = () => {
    if (!vendorToUpdate) return null;

    return (
      <form
        className="update-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateVendor();
        }}
      >
        <h2>Update Vendor</h2>
        <label>
          Vendor Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Contact:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Day Charge:
          <input
            type="text"
            name="charge"
            value={formData.charge}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          <FaEdit /> Update Vendor
        </button>
      </form>
    );
  };

  // Tiles for actions
  const tiles = [
    { name: 'View', icon: <FaEye />, color: '#4CAF50', action: 'view' },
    { name: 'Register', icon: <FaPlus />, color: '#2196F3', action: 'register' },
  ];

  return (
    <div className="manage-vendors">
      <div className="small-tiles-container">
        {tiles.map((tile, index) => (
          <SmallTile
            key={index}
            tile={tile}
            onClick={() => {
              setSelectedAction(tile.action);
              if (tile.action === 'register') {
                setVendorToUpdate(null); // Reset if switching to register
              }
            }}
          />
        ))}
      </div>

      {selectedAction === 'view' && renderViewTable()}
      {selectedAction === 'register' && renderRegisterForm()}
      {vendorToUpdate && renderUpdateForm()}

      <ToastContainer />
    </div>
  );
}

export default ManageVendors;
