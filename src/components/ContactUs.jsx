import React, { useState, useEffect } from "react";
import "../assets/css/Popup.css"; 

const ContactUs = ({ onClose }) => {
  const [loading, setLoading] = useState(true);

  // Loader 2 सेकंदांनी बंद करणे
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {loading ? (
          <div className="loader"></div> // Loader दिसेल
        ) : (
          <div className="popup-content">
            <h2>📞 Contact Us</h2>
            <p><strong>For Railway tickets booked through IRCTC</strong></p>
            <p>Customer Care Numbers: <a href="tel:14646">14646</a> / <a href="tel:08044647999">08044647999</a> / <a href="tel:08035734999">08035734999</a></p>
            <p>Queries: <a href="https://equery.irctc.co.in/" target="_blank" rel="noopener noreferrer">https://equery.irctc.co.in/</a></p>
            
            <h3>🔹 Loyalty Credit Card Complaints</h3>
            <p><strong>IRCTC-SBI</strong> 📞 <a href="tel:012439021212">0124-39021212</a> / <a href="tel:18001801295">18001801295</a></p>
            <p>Email: <a href="mailto:customercare@sbicard.com">customercare@sbicard.com</a></p>
            
            <p><strong>IRCTC-BOB</strong> 📞 <a href="tel:1800225100">1800225100</a> / <a href="tel:18001031006">18001031006</a></p>
            <p>Email: <a href="mailto:crm@bobfinancial.com">crm@bobfinancial.com</a></p>

            <p><strong>IRCTC-HDFC</strong> 📞 <a href="tel:18002026161">18002026161</a> / <a href="tel:18602676161">18602676161</a></p>
            <p>Email: <a href="https://www.hdfcbank.com/personal/need-help/contact-us" target="_blank" rel="noopener noreferrer">HDFC Contact Page</a></p>

            <button className="close-button" onClick={onClose}>❌ Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
