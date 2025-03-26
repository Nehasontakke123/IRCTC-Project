import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logoImg.png";
import FirstLogo from "../assets/images/First.png";
import "../assets/css/Nav.css";
import ContactUs from "./ContactUs"; 


const Navbar = () => {
  const [showPopup, setShowPopup] = useState(false); // State for popup

  return (
    <>
      <nav>
        {/* 🔹 Top Navigation Bar */}
        <div className="top-nav">
          <div className="nav-links">
            {/* Left Logo */}
            <div className="logo">
              <img src={FirstLogo} alt="Indian Railways" />
            </div>

            {/* Navigation Links */}
            <Link to="/login" className="button-primary">LOGIN</Link>
            <Link to="/register">REGISTER</Link>
            <Link to="/login">AGENT LOGIN</Link>
            <button className="contact-button" onClick={() => setShowPopup(true)}>CONTACT US</button>
            <Link to="/help-support">HELP & SUPPORT</Link>
            <Link to="/daily-deals" className="text-red-600 font-bold">DAILY DEALS</Link>

            {/* 🔴 ALERTS Button - Centered */}
            <Link to="/alerts" className="alert-button">ALERTS</Link>

            {/* Right Logo */}
            <div className="Second-logo">
              <img src={Logo} alt="Indian Railways" />
            </div>
          </div>
        </div>

        {/* 🔹 Bottom Navigation Bar */}
        <div className="bottom-nav">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/irctc-exclusive" className="irctc-button">IRCTC EXCLUSIVE</Link>
            <Link to="/trains" className="text-orange-600 font-bold">TRAINS</Link>
            <Link to="/loyalty">LOYALTY</Link>
            <Link to="/irctc-ewallet" className="text-orange-600">IRCTC eWallet</Link>
            <Link to="/buses">BUSES</Link>
            <Link to="/flights">FLIGHTS</Link>
            <Link to="/hotels">HOTELS</Link>
            <Link to="/holidays">HOLIDAYS</Link>
            <Link to="/station-navigation">📍 Station Navigation</Link>
            <Link to="/pnr-status" className="text-blue-600 font-bold">🔍 PNR STATUS</Link>

            {/* 🆕 Emergency Section Links */}
            <Link to="/emergency-help" className="text-red-500 font-bold">🚨 Emergency Help</Link>
            <Link to="/emergency-requests" className="text-blue-500">📋 Emergency Requests</Link>
            <Link to="/offline-booking" className="text-blue-500">Offline Booking Form</Link>
            <Link to="/offline-booking-list" className="text-blue-500">Offline Booking List</Link>
          </div>
        </div>
      </nav>

      {/* Show popup only if showPopup is true */}
      {showPopup && <ContactUs onClose={() => setShowPopup(false)} />}
      
    </>
  );
};

export default Navbar;



