import React from "react";
import "../assets/css/Footer.css"; // Import custom CSS

const Footer = () => {
  return (
    <footer className="footer-top">
      {/* Social Media Section */}
      <p>Get Connected with us on social networks</p>
  <div className="social-icons">
    <a href="#" className="icon facebook"></a>
    <a href="#" className="icon whatsapp"></a>
    <a href="#" className="icon youtube"></a>
    <a href="#" className="icon instagram"></a>
    <a href="#" className="icon linkedin"></a>
    <a href="#" className="icon telegram"></a>
    <a href="#" className="icon pinterest"></a>
    <a href="#" className="icon tumblr"></a>
    <a href="#" className="icon duck"></a>
    <a href="#" className="icon twitter"></a>
  </div>
  <div>
      </div>

      {/* Links Section */}
      <div className="footer-links">
        <div className="link-column">
          <h3>IRCTC Trains</h3>
          <h3>General Information</h3>
          <h3>Important Information</h3>
          <h3>Agents</h3>
          <h3>Enquiries</h3>
        </div>
        <div className="link-column">
          <h3>How To</h3>
          <h3>IRCTC Official App</h3>
          <h3>Advertise with us</h3>
          <h3>Refund Rules</h3>
          <h3>Person With Disability Facilities</h3>
        </div>
        <div className="link-column">
          <h3>IRCTC eWallet</h3>
          <h3>Avail Loyalty Benefits</h3>
          <h3>IRCTC-iPAY Payment Gateway</h3>
          <h3>IRCTC Zone</h3>
          <h3>DMRC Ticket Booking at IRCTC</h3>
        </div>
        <div className="link-column">
          <h3>For Newly Migrated Agents</h3>
          <h3>Mobile Zone</h3>
          <h3>Policies</h3>
          <h3>Ask Disha ChatBot</h3>
          <h3>About Us</h3>
        </div>
        <div className="link-column">
          <h3>Help & Support</h3>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>Copyright © 2025 - www.irctc.co.in. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
