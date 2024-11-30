import React from 'react';
import './SupplierSignin.css';

function SupplierSignin() {
  return (
    <div className="supplier-login-container">
      {/* Sign-In Section */}
      <div className="supplier-signin-section">
        <h2>Sign In</h2>
        <form>
          <label>
            User name:
            <input type="text" name="username" placeholder="Enter username" />
          </label>
          <label>
            Password:
            <input type="password" name="password" placeholder="Enter password" />
          </label>
          <a href="#" className="forget-password">Forgot Password?</a>
          <button type="submit" className="supplier-signin-button">Sign in</button>
        </form>
      </div>

      {/* Sign-Up Section */}
      <div className="supplier-signup-section">
        <h2>Welcome Back!</h2>
        <p>Don't have an account? Sign up to get started!</p>
        <button className="supplier-signup-button">Sign Up</button>
      </div>
    </div>
  );
}

export default SupplierSignin;
