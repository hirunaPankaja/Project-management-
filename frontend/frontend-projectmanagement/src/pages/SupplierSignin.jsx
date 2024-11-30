import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SupplierSignin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SupplierSignin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateSignup = () => {
    navigate('/sign-up/supplier');
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Sign in successful:', data);
        toast.success('Sign in successful');

        const { firstName, lastName, id, email, businessName } = data;

        // Add console logs to verify data
        console.log('First Name from response:', firstName);
        console.log('Last Name from response:', lastName);

        // Save user details to localStorage
        localStorage.setItem("role", "supplier"); // Set role as default
        localStorage.setItem("id", id);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("businessName", businessName);

        // Verify localStorage set correctly
        console.log('Stored role in localStorage:', localStorage.getItem("role"));
        console.log('Stored First Name in localStorage:', localStorage.getItem("firstName"));
        console.log('Stored Last Name in localStorage:', localStorage.getItem("lastName"));

        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Error signing in:', errorData.message);
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Error signing in.');
    }
  };

  return (
    <div className="supplier-login-container">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="supplier-signin-section">
        <h2>Sign In</h2>
        <form onSubmit={handleSignin}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <a onClick={() => navigate('/send-otp')} className="forget-password">Forgot Password?</a>
          <button type="submit" className="supplier-signin-button">Sign in</button>
        </form>
      </div>

      <div className="supplier-signup-section">
        <h2>Welcome Back!</h2>
        <p>Don't have an account? Sign up to get started!</p>
        <button className="supplier-signup-button" onClick={navigateSignup}>Sign Up</button>
      </div>
    </div>
  );
}

export default SupplierSignin;
