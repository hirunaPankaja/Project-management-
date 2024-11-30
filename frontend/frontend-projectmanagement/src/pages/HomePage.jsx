import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tile from '../components/Tile';

function HomePage({ role }) {
  const navigate = useNavigate();
  const tiles = getTilesByRole(role);

  const handleClick = (tile) => {
    switch (tile.name) {
      case 'Registration':
        navigate('/home/registration');
        break;
      case 'Update':
        navigate('/home/update');
        break;
      case 'Remove':
        navigate('/home/remove');
        break;
      case 'Propose Location':
        navigate('/home/propose-location');
        break;
      case 'Map':
        navigate('/home/map');
        break;
      case 'Locations':
        navigate('/home/locations');
        break;
      case 'Proposals':
        navigate('/home/proposals');
        break;
      case 'Contracts':
        navigate('/home/contracts');
        break;
      case 'Salary':
        navigate('/home/salary');
        break;
      case 'Requests':
        navigate('/home/vendor-requests');
        break;
      case 'Vendor Report':
        navigate('/home/vendor-report');
        break;
      case 'Manage Vendors':
        navigate('/home/manage-vendors');
        break;
      case 'Design Dashboard':
        navigate('/home/design-dashboard');
        break;
      case 'Designs':
        navigate('/home/designs');
        break;
      case 'Assignments':
        navigate('/home/assigments');
        break;
      case 'Complains':
        navigate('/home/Complains');
        break;
      case 'Project Dashboard':
        navigate('/home/project-dashboard');
        break;
      case 'Supporter Requests':
        navigate('/home/supporter-request');
        break;
      case 'Assign Supporters':
        navigate('/home/assign-supporter');
        break;
      case 'Send Procurement Request':
        navigate('/home/send-procurement-request');
        break;
      case 'Manage Designs':
        navigate('/home/manage-designs');
        break;
      case 'Arrange Meeting':
        navigate('/home/arrange-meeting');
        break;
      case 'Assign Designs':
        navigate('/home/assign-designs');
        break;
      case 'Manager Design Dashboard':
        navigate('/home/manager-design-dashboard');
        break;
      case 'Manager Project Dashboard':
        navigate('/home/manager-project-dashboard');
        break;
      case 'Invoices':
        navigate('/home/invoices');
        break;
      case 'Quality Check':
        navigate('/home/quality-check');
        break;
      case 'Assign Project':
        navigate('/home/assign-project');
        break;
      case 'Project Report':
        navigate('/home/project-report');
        break;
      case 'Design Report':
        navigate('/home/design-report');
        break;
      case 'Contact Supplier':
        navigate('/home/contact-supplier');
        break;
      default:
        console.error('Unknown tile name:', tile.name);
    }
  };

  return (
    <div className="home-container">
      <div className="tiles-container">
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            tile={tile}
            onClick={() => handleClick(tile)}
          />
        ))}
      </div>
    </div>
  );
}

function getTilesByRole(role) {
  switch (role) {
    case 'admin':
      return [
        { name: 'Registration', icon: 'person_add', color: '#4CAF50' }, // Changed icon and color
        { name: 'Update', icon: 'sync', color: '#FFC107' },              // Changed icon and color
        { name: 'Remove', icon: 'delete_forever', color: '#F44336' }     // Changed icon and color
      ];
    case 'propertyTeam':
      return [
        { name: 'Propose Location', icon: 'place', color: '#FF9800' },   // Changed icon and color
        { name: 'Update', icon: 'edit_location', color: '#FF5722' },     // Changed icon and color
        { name: 'Map', icon: 'public', color: '#2196F3' }                // Changed icon and color
      ];
    case 'lawyer':
      return [{ name: 'Map', icon: 'gavel', color: '#607D8B' }];         // Changed icon and color
    case 'propertyManager':
      return [
        { name: 'Map', icon: 'location_on', color: '#673AB7' },          // Changed icon and color
        { name: 'Locations', icon: 'business', color: '#3F51B5' },       // Changed icon and color
        { name: 'Proposals', icon: 'description', color: '#8BC34A' },    // Changed icon and color
        { name: 'Contracts', icon: 'receipt', color: '#9C27B0' }         // Changed icon and color
      ];
    case 'procurementManager':
      return [
        { name: 'Manage Vendors', icon: 'supervisor_account', color: '#03A9F4' }, // Changed icon and color
        { name: 'Assign Vendors', icon: 'assignment_ind', color: '#FF9800' },     // Changed icon and color
        { name: 'Salary', icon: 'attach_money', color: '#4CAF50' },               // Changed icon and color
        { name: 'Vendor Requests', icon: 'question_answer', color: '#FF5722' },          // Changed icon and color
        { name: 'Vendor Report', icon: 'assessment', color: '#9C27B0' }                  // Changed icon and color
      ];
    case 'designer':
      return [
        { name: 'Design Dashboard', icon: 'dashboard', color: '#FF5722' },        // Changed icon and color
        { name: 'Designs', icon: 'palette', color: '#2196F3' },                   // Changed icon and color
        { name: 'Assignments', icon: 'assignment', color: '#FFC107' },            // Changed icon and color
        { name: 'Map', icon: 'map', color: '#8BC34A' },                           // Changed icon and color
        { name: 'Complains', icon: 'report_problem', color: '#F44336' }           // Changed icon and color
      ];
    case 'engineer':
      return [
        { name: 'Project Dashboard', icon: 'build', color: '#03A9F4' },           // Changed icon and color
        { name: 'Locations', icon: 'location_city', color: '#9C27B0' },           // Changed icon and color
        { name: 'Assignments', icon: 'assignment_turned_in', color: '#FFC107' },  // Changed icon and color
        { name: 'Contact Supplier', icon: 'contact_phone', color: '#FF5722' },    // Changed icon and color
        { name: 'Complains', icon: 'warning', color: '#F44336' },                 // Changed icon and color
        { name: 'Supporter Requests', icon: 'send', color: '#4CAF50' },                     // Changed icon and color
        { name: 'Assign Supporters', icon: 'person_add', color: '#673AB7' },      // Changed icon and color
        { name: 'Send Procurement Request', icon: 'send', color: '#03A9F4' }      // Changed icon and color
      ];
    case 'designManager':
      return [
        { name: 'Manager Design Dashboard', icon: 'dashboard_customize', color: '#673AB7' }, // Changed icon and color
        { name: 'Manage Designs', icon: 'layers', color: '#FF9800' },                // Changed icon and color
        { name: 'Arrange Meeting', icon: 'event', color: '#4CAF50' },                // Changed icon and color
        { name: 'Design Report', icon: 'bar_chart', color: '#2196F3' },                     // Changed icon and color
        { name: 'Contracts', icon: 'contract', color: '#FF5722' },                   // Changed icon and color
        { name: 'Assign Designs', icon: 'assignment', color: '#8BC34A' },            // Changed icon and color
        { name: 'Complains', icon: 'feedback', color: '#F44336' }                    // Changed icon and color
      ];
    case 'projectManager':
      return [
        { name: 'Manager Project Dashboard', icon: 'dashboard', color: '#2196F3' },          // Changed icon and color
        { name: 'Invoices', icon: 'receipt', color: '#FF9800' },                     // Changed icon and color
        { name: 'Quality Check', icon: 'check_circle', color: '#4CAF50' },           // Changed icon and color
        { name: 'Assign Projects', icon: 'assignment', color: '#9C27B0' },           // Changed icon and color
        { name: 'Complains', icon: 'report', color: '#F44336' },                     // Changed icon and color
        { name: 'Project Reports', icon: 'bar_chart', color: '#FFC107' },                    // Changed icon and color
        { name: 'Map', icon: 'public', color: '#673AB7' }                            // Changed icon and color
      ];
    default:
      return [];
  }
}


export default HomePage;
