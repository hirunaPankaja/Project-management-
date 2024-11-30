import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import StaffSignin from "./pages/StaffSignin";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import SendOtp from "./pages/SendOtp";
import ChangePassword from "./pages/ChangePassword";
import SupplierSignin from "./pages/SupplierSignin";
import ManageVendors from "./pages/ManageVendors";
import ProfilePage from "./components/ProfilePage";
import ProposeLocation from "./pages/ProposeLocation";
import SupplierRegister from "./pages/SupplierRegister";
import SupplierDashboard from "./pages/SupplierDashboard";
import UploadItem from "./pages/UploadItem";
import ViewReviews from "./pages/ViewReviews";
import SProfilePage from "./pages/SProfilePage";
import Requests from "./pages/Requests";
import ContractDetails from "./pages/ContractDetails";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    profilePic: "",
  });

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionStorage.setItem("sessionActive", "true");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("sessionActive")) {
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    const savedFirstName = localStorage.getItem("firstName");
    const savedLastName = localStorage.getItem("lastName");
    const savedProfilePic = localStorage.getItem("profilePic");
    const savedRole = localStorage.getItem("role");

    if (savedFirstName && savedLastName) {
      setUserDetails({
        firstName: savedFirstName,
        lastName: savedLastName,
        profilePic: savedProfilePic || "",
      });
    }
  }, [role]);

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.removeItem("sessionActive");
    setRole(null);
    setUserDetails({
      firstName: "",
      lastName: "",
      profilePic: "",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        {role && (
          <>
            <Navbar
              userDetails={userDetails}
              setRole={setRole}
              setUserDetails={setUserDetails}
              handleSignOut={handleSignOut}
            />
            <Sidebar
              role={role}
              isCollapsed={isSidebarCollapsed}
              toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
            />
          </>
        )}

        <div className={`main-content ${isSidebarCollapsed ? "collapsed" : ""}`}>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/sign-in/supplier" element={<SupplierSignin />} />
            <Route path="/sign-up/supplier" element={<SupplierRegister />} />
            <Route
              path="/sign-in/staff"
              element={role ? <Navigate to="/home" /> : <StaffSignin setRole={setRole} setUserDetails={setUserDetails} />}
            />
            <Route path="/home" element={role ? <HomePage role={role} /> : <Navigate to="/" />} />
            <Route path="/home/map" element={role ? <Map role={role} /> : <Navigate to="/" />} />
            <Route path="/map" element={role ? <Map /> : <Navigate to="/" />} />
            <Route path="/send-otp" element={<SendOtp />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/home/manage-vendors" element={<ManageVendors />} />
            <Route path="/home/propose-location" element={<ProposeLocation />} />
            <Route path="/Sprofile" element={<SProfilePage />} />

            {/* Dashboard Route with nested routes */}
            <Route path="/dashboard" element={<SupplierDashboard />}>
              <Route path="contract-details" element={<ContractDetails />} />
              <Route path="upload-item" element={<UploadItem />} />
              <Route path="view-reviews" element={<ViewReviews />} />
              <Route path="requests" element={<Requests />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
