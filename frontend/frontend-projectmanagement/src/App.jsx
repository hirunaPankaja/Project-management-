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
import Contracts from "./pages/Contracts";
import VendorReport from "./pages/VendorReport";
import VendorRequests from "./pages/VendorRequests";
import VendorSalary from "./pages/VendorSalary";
import Complains from "./pages/Complains";
import DesignDashboard from "./pages/DesignDashboard";
import Designs from "./pages/Designs";
import Assigments from "./pages/Assigments";
import ProjectDashboard from "./pages/ProjectDashboard";
import SupporterRequests from "./pages/SupporterRequests";
import AssignSupporters from "./pages/AssignSupporters";
import SendProcurementRequests from "./pages/SendProcurementRequests";
import ArrangeMeeting from "./pages/ArrangeMeeting";
import AssignsDesigns from "./pages/AssignsDesigns";
import ManagerDesignDashboard from "./pages/ManagerDesignDashboard";
import ManagerProjectDashboard from "./pages/ManagerProjectDashboard";
import AssignProject from "./pages/AssignProject";
import ProjectReport from "./pages/ProjectReport";
import ContactSupplier from "./pages/ContactSupplier";
import Invoices from "./pages/Invoices"; 
import QualityCheck from "./pages/QualityCheck";


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
            <Route path="/home/map" element={role ? <Map /> : <Navigate to="/" />} />
            <Route path="/send-otp" element={<SendOtp />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/home/manage-vendors" element={<ManageVendors />} />
            <Route path="/home/propose-location" element={<ProposeLocation/>}/>
            <Route path="/home/contracts" element={<Contracts/>}/>
            <Route path="/home/vendor-report" element={<VendorReport/>}/>
            <Route path="/home/vendor-requests" element={<VendorRequests/>}/>
            <Route path="/home/salary"element={<VendorSalary/>}/>
            <Route path="/home/complains" element={<Complains/>}/>
            <Route path="/home/design-dashboard" element={<DesignDashboard/>}/>
            <Route path="/home/designs" element={<Designs/>}/>
            <Route path="/home/assigments" element={<Assigments/>}/>
            <Route path="/home/Complains" element={<Complains/>}/>
            <Route path="/home/project-dashboard" element={<ProjectDashboard/>}/>
            <Route path="/home/supporter-request" element={<SupporterRequests/>}/>
            <Route path="/home/assign-supporter" element={<AssignSupporters/>}/>
            <Route path="/home/send-procurement-request" element={<SendProcurementRequests/>}/>
            <Route path="/home/manage-designs" element={<ManageVendors/>}/>
            <Route path="/home/arrange-meeting" element={<ArrangeMeeting/>}/>
            <Route path="/home/assign-designs" element={<AssignsDesigns/>}/>
            <Route path="/home/manager-design-dashboard" element={<ManagerDesignDashboard/>}/>
            <Route path="/home/manager-project-dashboard" element={<ManagerProjectDashboard/>}/>
            <Route path="/home/invoices" element={<Invoices/>}/>
            <Route path="/home/quality-check" element={<QualityCheck/>}/>
            <Route path="/home/assign-project" element={<AssignProject/>}/>
            <Route path="/home/project-report"element={<ProjectReport/>}/>
            <Route path="/home/contact-supplier" element={<ContactSupplier/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
