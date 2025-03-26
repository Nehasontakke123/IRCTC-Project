import { useState, useEffect } from "react";
import { FaTrain, FaSubway, FaBus, FaUmbrellaBeach } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/Home.css";
import OneImg from "../assets/images/HD1Img.png";
import TwoImg from "../assets/images/HD2Img.png";
import StationNavigation from "../components/StationNavigation";
import ARNavigation from "../components/ARNavigation";
import Loader from "../components/Loader"; 

import Holiday from '../components/Holiday';
import ServicesSection from "../components/ServicesSection";
const images = [OneImg, TwoImg];
const stations = ["Mumbai", "Delhi", "Kolkata", "Chennai", "Hyderabad", "Bangalore", "Pune", "Nagpur","Nanded"];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showNavigationPopup, setShowNavigationPopup] = useState(false);
  const [predictedFare, setPredictedFare] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    classType: "All Classes",
    quota: "GENERAL",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.date) {
      toast.error("🚨 Please fill in all fields before searching!");
      return;
    }

    try {
      setLoading(true);
      console.log("Loading State Before API Call:", loading);
      toast.info("⏳ Fetching fare details...");

      const response = await axios.get("http://localhost:5000/api/fare/predict", {
        params: { source: formData.from, destination: formData.to, date: formData.date },
      });

      setPredictedFare(response.data.predictedFare);
      toast.success("✅ Fare prediction successful!");
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error fetching fare:", error);
      toast.error("❌ Failed to predict fare. Please try again.");
    } finally {
      // Delay setting loading to false to allow loader visibility
      setTimeout(() => {
        setLoading(false);
        console.log("Loading State After API Call:", loading);
      }, 1000);
    }
  };

  const handleShowNavigation = () => {
    if (!formData.to) {
      toast.error("🚉 Please enter a destination station!");
      return;
    }
    setShowNavigationPopup(true);
  };

  return (
    <>
      {loading && <Loader />} {/* Loader now properly visible */}

      <div className={`home ${loading ? "blurred" : ""}`}>
        <div className="home__slider">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="home__slider-image fade-in" />
        </div>

        <div className="marquee-container">
          <div className="marquee-content">
            <FaTrain className="marquee-icon" />
            <span>WELCOME TO INDIAN RAILWAYS</span>
            <FaSubway className="marquee-icon" />
            <FaBus className="marquee-icon" />
            <FaUmbrellaBeach className="marquee-icon" />
          </div>
        </div>

        <div className="home__overlay glassmorphism">
          <div className="home__form">
            <h2>🎫 BOOK YOUR TICKET</h2>
            <form onSubmit={handleSubmit}>
              <select name="from" value={formData.from} onChange={handleChange} required>
                <option value="">From</option>
                {stations.map((station) => (
                  <option key={station} value={station}>{station}</option>
                ))}
              </select>

              <select name="to" value={formData.to} onChange={handleChange} required>
                <option value="">To</option>
                {stations.map((station) => (
                  <option key={station} value={station}>{station}</option>
                ))}
              </select>

              <input type="date" name="date" value={formData.date} onChange={handleChange} required />

              <select name="classType" value={formData.classType} onChange={handleChange}>
                <option value="All Classes">All Classes</option>
                <option value="Sleeper">Sleeper</option>
                <option value="AC 3 Tier">AC 3 Tier</option>
                <option value="AC 2 Tier">AC 2 Tier</option>
                <option value="First Class">First Class</option>
              </select>

              <select name="quota" value={formData.quota} onChange={handleChange}>
                <option value="GENERAL">GENERAL</option>
                <option value="LADIES">LADIES</option>
                <option value="SENIOR CITIZEN">SENIOR CITIZEN</option>
                <option value="TATKAL">TATKAL</option>
              </select>

              <button type="submit">🔍 Search</button>
            </form>
          </div>
        </div>

        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h3>🎟 Ticket Details</h3>
              <p><b>From:</b> {formData.from}</p>
              <p><b>To:</b> {formData.to}</p>
              <p><b>Date:</b> {formData.date}</p>
              <p><b>Class:</b> {formData.classType}</p>
              <p><b>Quota:</b> {formData.quota}</p>
              {predictedFare !== null && <p><b>💰 Predicted Fare:</b> ₹{predictedFare}</p>}

              <button onClick={() => setIsPopupOpen(false)} className="close-popup-btn">Close</button>
              <button onClick={handleShowNavigation} className="nav-btn">📍 Station Navigation</button>
            </div>
          </div>
        )}

        {showNavigationPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h3>🚉 Station & AR Navigation</h3>
              <StationNavigation stationName={formData.to} />
              <ARNavigation stationName={formData.to} />
              <button onClick={() => setShowNavigationPopup(false)} className="close-popup-btn">Close</button>
            </div>
          </div>
        )}
      </div>
      <ServicesSection/>
      <Holiday/>
      
    </>
  );
};

export default HomePage;



