import React from 'react';
import './Sidebar.css';
import emailIcon from '../assets/email.jpg';

function Sidebar({ isCollapsed, toggleSidebar }) {
  const role = localStorage.getItem('role');

  // Explicitly declare all role-based links
  const roleLinks = {
    admin: [
      { name: 'Register', icon: 'person_add', href: '/home/registration' },
      { name: 'Update', icon: 'sync', href: '/home/update' },
      { name: 'Remove', icon: 'delete_forever', href: '/home/remove' },
    ],
    propertyTeam: [
      { name: 'Propose Location', icon: 'place', href: '/home/propose-location' },
      { name: 'Map', icon: 'public', href: '/home/map' },
      { name: 'Update', icon: 'edit_location', href: '/home/update' },
    ],
    lawyer: [
      { name: 'Map', icon: 'gavel', href: '/home/map' },
    ],
    propertyManager: [
      { name: 'Map', icon: 'location_on', href: '/home/map' },
      { name: 'Locations', icon: 'business', href: '/home/locations' },
      { name: 'Proposals', icon: 'description', href: '/home/proposals' },
      { name: 'Contracts', icon: 'receipt', href: '/home/contracts' },
    ],
    procurementManager: [
      { name: 'Manage Vendors', icon: 'supervisor_account', href: '/home/manage-vendors' },
      { name: 'Assign Vendors', icon: 'assignment_ind', href: '/home/assign-vendors' },
      { name: 'Salary', icon: 'attach_money', href: '/home/salary' },
      { name: 'Requests', icon: 'question_answer', href: '/home/requests' },
      { name: 'Report', icon: 'assessment', href: '/home/report' },
    ],
    designer: [
      { name: 'Design Dashboard', icon: 'dashboard', href: '/home/design-dashboard' },
      { name: 'Designs', icon: 'palette', href: '/home/designs' },
      { name: 'Assignments', icon: 'assignment', href: '/home/assignments' },
      { name: 'Map', icon: 'map', href: '/home/map' },
      { name: 'Complains', icon: 'report_problem', href: '/home/complains' },
    ],
    engineer: [
      { name: 'Project Dashboard', icon: 'build', href: '/home/project-dashboard' },
      { name: 'Locations', icon: 'location_city', href: '/home/locations' },
      { name: 'Assignments', icon: 'assignment_turned_in', href: '/home/assignments' },
      { name: 'Contact Supplier', icon: 'contact_phone', href: '/home/contact-supplier' },
      { name: 'Complains', icon: 'warning', href: '/home/complains' },
      { name: 'Requests', icon: 'send', href: '/home/requests' },
      { name: 'Assign Supporters', icon: 'person_add', href: '/home/assign-supporters' },
      { name: 'Send Procurement Request', icon: 'send', href: '/home/send-procurement-request' },
    ],
    designManager: [
      { name: 'Design Dashboard', icon: 'dashboard_customize', href: '/home/design-dashboard' },
      { name: 'Manage Designs', icon: 'layers', href: '/home/manage-designs' },
      { name: 'Arrange Meeting', icon: 'event', href: '/home/arrange-meeting' },
      { name: 'Report', icon: 'bar_chart', href: '/home/report' },
      { name: 'Contracts', icon: 'contract', href: '/home/contracts' },
      { name: 'Assign Designs', icon: 'assignment', href: '/home/assign-designs' },
      { name: 'Complains', icon: 'feedback', href: '/home/complains' },
    ],
    projectManager: [
      { name: 'Project Dashboard', icon: 'dashboard', href: '/home/project-dashboard' },
      { name: 'Invoices', icon: 'receipt', href: '/home/invoices' },
      { name: 'Quality Check', icon: 'check_circle', href: '/home/quality-check' },
      { name: 'Assign Projects', icon: 'assignment', href: '/home/assign-projects' },
      { name: 'Complains', icon: 'report', href: '/home/complains' },
      { name: 'Reports', icon: 'bar_chart', href: '/home/reports' },
      { name: 'Map', icon: 'public', href: '/home/map' },
    ],
  };

  // Get the links for the current role or an empty array
  const links = roleLinks[role] || [];

  return (
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="logo-section">
        <img src={emailIcon} alt="Logo" className="logo" />
        {!isCollapsed && <h4 className="app-name">Keels</h4>}
      </div>

      <button onClick={toggleSidebar} className="toggle-btn">
        <span className="material-icons">{isCollapsed ? 'menu_open' : 'menu'}</span>
      </button>

      <div className="sidebar">
        <a href="/home" data-tooltip="Dashboard">
          <span className="material-icons">home</span>
          {!isCollapsed && <h3 className="item-label">Home</h3>}
        </a>

        {/* Dynamically render role-specific links */}
        {links.map((link, index) => (
          <a key={index} href={link.href} data-tooltip={link.name}>
            <span className="material-icons">{link.icon}</span>
            {!isCollapsed && <h3 className="item-label">{link.name}</h3>}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
