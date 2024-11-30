import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ setRole, handleSignOut }) {
  const navigate = useNavigate();
  
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    const savedFirstName = localStorage.getItem('firstName');
    const savedLastName = localStorage.getItem('lastName');

    // Add console logs
    console.log('Retrieved First Name from localStorage:', savedFirstName);
    console.log('Retrieved Last Name from localStorage:', savedLastName);

    if (savedFirstName && savedLastName) {
      setUserDetails({
        firstName: savedFirstName,
        lastName: savedLastName,
      });
    }
  }, []);
  
  const profile = () => {
    navigate('/profile');
  };

  const signout = () => {
    handleSignOut();
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="user-info">
        <button className="notification-btn" onClick={() => console.log('Notifications clicked')}>
          <span className="material-icons notification-icon">notifications</span>
        </button>
        <span className="user-name">{userDetails.firstName} {userDetails.lastName}</span>
        <button className="signout" onClick={signout}>Sign Out</button>
      </div>
    </div>
  );
}

export default Navbar;
