import React from "react";
import "./SProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="profile-page">

      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-card">
          <img
            src="https://via.placeholder.com/120" // Replace with your avatar link
            alt="Profile"
            className="profile-picture"
          />
          <h2>yasith pasindu</h2>
          <p className="designation">Supplier 01</p>
          <p className="location">Bay Area, San Francisco, CA</p>
          <div className="profile-actions">
            <button className="follow-button">Update</button>
          </div>
        </div>

        {/* Contact Details */}
        <div className="contact-details">
          <table>
            <tbody>
              <tr>
                <td>Full Name</td>
                <td>Johnatan Smith</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>example@example.com</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>(097) 234-5678</td>
              </tr>
              <tr>
                <td>Mobile</td>
                <td>(098) 765-4321</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>Bay Area, San Francisco, CA</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Social Links */}
        <div className="social-links">
          <ul>
            <li>
              <i className="fas fa-globe"></i> https://mdbootstrap.com
            </li>
            <li>
              <i className="fab fa-github"></i> mdbootstrap
            </li>
            <li>
              <i className="fab fa-twitter"></i> @mdbootstrap
            </li>
            <li>
              <i className="fab fa-instagram"></i> mdbootstrap
            </li>
            <li>
              <i className="fab fa-facebook"></i> mdbootstrap
            </li>
          </ul>
        </div>

        {/* Project Status */}
        <div className="project-status">
          <div className="status-card">
            <h4>assignment Project Status</h4>
            <p>Web Design</p>
            <progress value="80" max="100"></progress>
            <p>Website Markup</p>
            <progress value="72" max="100"></progress>

          </div>
          <div className="status-card">
            <h4>assignment Project Status</h4>
            <p>Web Design</p>
            <progress value="80" max="100"></progress>
            <p>Website Markup</p>
            <progress value="72" max="100"></progress>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
