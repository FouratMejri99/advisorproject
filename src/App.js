import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import Advisors from "./pages/Advisors";
import Booking from "./pages/Booking";
import Home from "./pages/Home";
import Login from "./pages/login";

function App() {
  const [userType, setUserType] = useState(null); // null, 'admin', 'advisor', or 'normal'

  return (
    <Router>
      {/* Pass userType and setUserType to Navbar and Login */}
      <Navbar userType={userType} setUserType={setUserType} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/advisors" element={<Advisors />} />
        <Route path="/login" element={<Login setUserType={setUserType} />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/dashboard" element={<AdvisorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
