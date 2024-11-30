import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Import Sidebar
import Tile from '../components/Tile'; // Import Tile
import './SupplierDashboard.css';

const SupplierDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sample tile data
  const tiles = [
    { name: 'Contracts', icon: 'assignment', color: '#6CD071', path: '/dashboard/contract-details' },
    { name: 'Profile', icon: 'person', color: '#FFA726', path: '/Sprofile' },
    { name: 'Upload Item Image', icon: 'cloud_upload', color: '#42A5F5', path: '/dashboard/upload-item' },
    { name: 'View Reviews', icon: 'rate_review', color: '#FFCA28', path: '/dashboard/view-reviews' },
    { name: 'Requests', icon: 'question_answer', color: '#E57373', path: '/dashboard/requests' }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="dashboard-header">
          <h2>Dashboard</h2>
        </div>
        <div className="tiles-container">
          {tiles.map((tile, index) => (
            <Tile
              key={index}
              tile={tile}
              onClick={() => window.location.href = tile.path} // Navigate to the tile's path
            />
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SupplierDashboard;
