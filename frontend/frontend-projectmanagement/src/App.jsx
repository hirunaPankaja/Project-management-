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
import ProfilePage from "./components/ProfilePage";
import ManageVendors from "./pages/ManageVendors";
import ProposeLocation from "./pages/ProposeLocation";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a flag in sessionStorage to indicate the session is active
    sessionStorage.setItem("sessionActive", "true");
    setLoading(false);
  }, []);

  // Clear localStorage if sessionActive flag is missing (tab or window closed)
  useEffect(() => {
    if (!sessionStorage.getItem("sessionActive")) {
      localStorage.clear();
    }
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.removeItem("sessionActive");
    setRole(null);
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
              setRole={setRole}
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
            <Route
              path="/sign-in/staff"
              element={
                role ? (
                  <Navigate to="/home" />
                ) : (
                  <StaffSignin setRole={setRole} />
                )
              }
            />
            <Route
              path="/home"
              element={role ? <HomePage role={role} /> : <Navigate to="/" />}
            />
            <Route
              path="/home/map"
              element={role ? <Map role={role} /> : <Navigate to="/" />}
            />
            <Route path="/map" element={role ? <Map /> : <Navigate to="/" />} />
            <Route path="/send-otp" element={<SendOtp />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/home/manage-vendors" element={<ManageVendors />} />
            <Route path="/home/propose-location" element={<ProposeLocation/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
